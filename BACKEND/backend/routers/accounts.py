from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

import models, schemas
from database import get_db

router = APIRouter(
    prefix="/accounts",
    tags=["accounts"],
)

@router.get("/", response_model=List[schemas.Account])
def read_accounts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    accounts = db.query(models.Account).offset(skip).limit(limit).all()
    return accounts

@router.post("/", response_model=schemas.Account)
def create_account(account: schemas.AccountCreate, db: Session = Depends(get_db)):
    db_account = models.Account(**account.model_dump())
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    return db_account

@router.post("/{account_id}/login", response_model=schemas.Account)
def login_account(account_id: int, login_data: schemas.AccountLogin, db: Session = Depends(get_db)):
    db_account = db.query(models.Account).filter(models.Account.id == account_id).first()
    if not db_account:
        raise HTTPException(status_code=404, detail="Account not found")
    db_account.connected = True
    db_account.account_name = login_data.account_name
    db.commit()
    db.refresh(db_account)
    return db_account

@router.post("/{account_id}/logout", response_model=schemas.Account)
def logout_account(account_id: int, db: Session = Depends(get_db)):
    db_account = db.query(models.Account).filter(models.Account.id == account_id).first()
    if not db_account:
        raise HTTPException(status_code=404, detail="Account not found")
    db_account.connected = False
    db_account.account_name = None
    db.commit()
    db.refresh(db_account)
    return db_account
