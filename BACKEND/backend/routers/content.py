from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

import models, schemas
from database import get_db

router = APIRouter(
    prefix="/content",
    tags=["content"],
)

@router.get("/", response_model=List[schemas.ContentAsset])
def read_content(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    assets = db.query(models.ContentAsset).offset(skip).limit(limit).all()
    return assets

@router.post("/", response_model=schemas.ContentAsset)
def create_content(asset: schemas.ContentAssetCreate, db: Session = Depends(get_db)):
    db_asset = models.ContentAsset(**asset.model_dump())
    db.add(db_asset)
    db.commit()
    db.refresh(db_asset)
    return db_asset
