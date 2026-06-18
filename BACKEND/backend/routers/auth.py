from fastapi import APIRouter, Depends, HTTPException
from database import get_db
import schemas
import pyotp
import qrcode
import base64
from io import BytesIO
from passlib.context import CryptContext

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    if not hashed_password:
        return False
    return pwd_context.verify(plain_password, hashed_password)

@router.post("/google", response_model=schemas.User)
async def google_login(login_data: schemas.GoogleLogin, db = Depends(get_db)):
    # Check if user exists by google_id or email
    db_user = await db.users.find_one({
        "$or": [
            {"google_id": login_data.google_id},
            {"email": login_data.email}
        ]
    })
    
    if db_user:
        # Update google_id and picture if they were missing or changed
        update_data = {
            "google_id": login_data.google_id,
            "picture": login_data.picture,
            "full_name": login_data.full_name,
            "first_name": login_data.first_name,
            "last_name": login_data.last_name
        }
        await db.users.update_one({"_id": db_user["_id"]}, {"$set": update_data})
        db_user.update(update_data)
        return db_user
    
    # Create new user
    new_user = {
        "email": login_data.email,
        "google_id": login_data.google_id,
        "full_name": login_data.full_name,
        "first_name": login_data.first_name,
        "last_name": login_data.last_name,
        "picture": login_data.picture,
        "is_active": True,
        "accounts": [],
        "hashed_password": None,
        "totp_secret": None,
        "is_totp_enabled": False
    }
    result = await db.users.insert_one(new_user)
    new_user["_id"] = result.inserted_id
    return new_user

@router.post("/update-password")
async def update_password(data: schemas.PasswordUpdate, db = Depends(get_db)):
    user = await db.users.find_one({"email": data.email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.get("hashed_password") and data.old_password:
        if not verify_password(data.old_password, user["hashed_password"]):
            raise HTTPException(status_code=400, detail="Incorrect old password")
            
    hashed_password = get_password_hash(data.new_password)
    await db.users.update_one({"_id": user["_id"]}, {"$set": {"hashed_password": hashed_password}})
    return {"message": "Password updated successfully"}

@router.post("/2fa/generate")
async def generate_2fa(data: schemas.TwoFactorRequest, db = Depends(get_db)):
    user = await db.users.find_one({"email": data.email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    secret = pyotp.random_base32()
    await db.users.update_one({"_id": user["_id"]}, {"$set": {"totp_secret": secret}})
    
    totp = pyotp.TOTP(secret)
    uri = totp.provisioning_uri(name=user["email"], issuer_name="Social Media Dashboard")
    
    qr = qrcode.make(uri)
    buf = BytesIO()
    qr.save(buf, format='PNG')
    qr_b64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    
    return {"qr_code": f"data:image/png;base64,{qr_b64}", "secret": secret}

@router.post("/2fa/verify")
async def verify_2fa(data: schemas.TwoFactorVerify, db = Depends(get_db)):
    user = await db.users.find_one({"email": data.email})
    if not user or not user.get("totp_secret"):
        raise HTTPException(status_code=400, detail="2FA not initiated")
        
    totp = pyotp.TOTP(user["totp_secret"])
    if not totp.verify(data.code):
        raise HTTPException(status_code=400, detail="Invalid 2FA code")
        
    await db.users.update_one({"_id": user["_id"]}, {"$set": {"is_totp_enabled": True}})
    return {"message": "2FA verified and enabled successfully"}

