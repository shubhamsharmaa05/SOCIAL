from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas
from database import get_db

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

@router.post("/google", response_model=schemas.User)
def google_login(login_data: schemas.GoogleLogin, db: Session = Depends(get_db)):
    # Check if user exists by google_id or email
    db_user = db.query(models.User).filter(
        (models.User.google_id == login_data.google_id) | 
        (models.User.email == login_data.email)
    ).first()
    
    if db_user:
        # Update google_id and picture if they were missing or changed
        db_user.google_id = login_data.google_id
        db_user.picture = login_data.picture
        db_user.full_name = login_data.full_name
        db.commit()
        db.refresh(db_user)
        return db_user
    
    # Create new user
    new_user = models.User(
        email=login_data.email,
        google_id=login_data.google_id,
        full_name=login_data.full_name,
        picture=login_data.picture
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

import pyotp
import qrcode
import base64
from io import BytesIO
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    if not hashed_password:
        return False
    return pwd_context.verify(plain_password, hashed_password)

@router.post("/update-password")
def update_password(data: schemas.PasswordUpdate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.hashed_password and data.old_password:
        if not verify_password(data.old_password, user.hashed_password):
            raise HTTPException(status_code=400, detail="Incorrect old password")
            
    user.hashed_password = get_password_hash(data.new_password)
    db.commit()
    return {"message": "Password updated successfully"}

@router.post("/2fa/generate")
def generate_2fa(data: schemas.TwoFactorRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    secret = pyotp.random_base32()
    user.totp_secret = secret
    db.commit()
    
    totp = pyotp.TOTP(secret)
    uri = totp.provisioning_uri(name=user.email, issuer_name="Social Media Dashboard")
    
    qr = qrcode.make(uri)
    buf = BytesIO()
    qr.save(buf, format='PNG')
    qr_b64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    
    return {"qr_code": f"data:image/png;base64,{qr_b64}", "secret": secret}

@router.post("/2fa/verify")
def verify_2fa(data: schemas.TwoFactorVerify, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == data.email).first()
    if not user or not user.totp_secret:
        raise HTTPException(status_code=400, detail="2FA not initiated")
        
    totp = pyotp.TOTP(user.totp_secret)
    if not totp.verify(data.code):
        raise HTTPException(status_code=400, detail="Invalid 2FA code")
        
    user.is_totp_enabled = True
    db.commit()
    return {"message": "2FA verified and enabled successfully"}
