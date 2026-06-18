from fastapi import APIRouter, Depends
from typing import List
import schemas
from database import get_db

router = APIRouter(
    prefix="/queue",
    tags=["queue"],
)

@router.get("/", response_model=List[schemas.PublishingTask])
async def read_queue(skip: int = 0, limit: int = 100, db = Depends(get_db)):
    cursor = db.publishing_tasks.find().skip(skip).limit(limit)
    tasks = await cursor.to_list(length=limit)
    return tasks

@router.post("/", response_model=schemas.PublishingTask)
async def create_task(task: schemas.PublishingTaskCreate, db = Depends(get_db)):
    task_dict = task.model_dump()
    result = await db.publishing_tasks.insert_one(task_dict)
    task_dict["_id"] = result.inserted_id
    return task_dict
