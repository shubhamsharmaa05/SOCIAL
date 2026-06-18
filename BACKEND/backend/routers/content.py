from fastapi import APIRouter, Depends
from typing import List
import schemas
from database import get_db

router = APIRouter(
    prefix="/content",
    tags=["content"],
)

@router.get("/", response_model=List[schemas.ContentAsset])
async def read_content(skip: int = 0, limit: int = 100, db = Depends(get_db)):
    cursor = db.content_assets.find().skip(skip).limit(limit)
    assets = await cursor.to_list(length=limit)
    return assets

@router.post("/", response_model=schemas.ContentAsset)
async def create_content(asset: schemas.ContentAssetCreate, db = Depends(get_db)):
    asset_dict = asset.model_dump()
    result = await db.content_assets.insert_one(asset_dict)
    asset_dict["_id"] = result.inserted_id
    return asset_dict
