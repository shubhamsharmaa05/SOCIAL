from fastapi import APIRouter, Depends, HTTPException
from typing import List
from bson import ObjectId
import schemas
from database import get_db

router = APIRouter(
    prefix="/accounts",
    tags=["accounts"],
)

@router.get("/", response_model=List[schemas.Account])
async def read_accounts(skip: int = 0, limit: int = 100, db = Depends(get_db)):
    accounts_cursor = db.accounts.find().skip(skip).limit(limit)
    accounts = await accounts_cursor.to_list(length=limit)
    return accounts

@router.post("/", response_model=schemas.Account)
async def create_account(account: schemas.AccountCreate, db = Depends(get_db)):
    account_dict = account.model_dump()
    result = await db.accounts.insert_one(account_dict)
    account_dict["_id"] = result.inserted_id
    return account_dict

@router.post("/{account_id}/login", response_model=schemas.Account)
async def login_account(account_id: str, login_data: schemas.AccountLogin, db = Depends(get_db)):
    if not ObjectId.is_valid(account_id):
        raise HTTPException(status_code=400, detail="Invalid account ID")
    
    db_account = await db.accounts.find_one({"_id": ObjectId(account_id)})
    if not db_account:
        raise HTTPException(status_code=404, detail="Account not found")
        
    update_data = {
        "connected": True,
        "account_name": login_data.account_name
    }
    await db.accounts.update_one({"_id": db_account["_id"]}, {"$set": update_data})
    db_account.update(update_data)
    return db_account

@router.post("/{account_id}/logout", response_model=schemas.Account)
async def logout_account(account_id: str, db = Depends(get_db)):
    if not ObjectId.is_valid(account_id):
        raise HTTPException(status_code=400, detail="Invalid account ID")
        
    db_account = await db.accounts.find_one({"_id": ObjectId(account_id)})
    if not db_account:
        raise HTTPException(status_code=404, detail="Account not found")
        
    update_data = {
        "connected": False,
        "account_name": None
    }
    await db.accounts.update_one({"_id": db_account["_id"]}, {"$set": update_data})
    db_account.update(update_data)
    return db_account
