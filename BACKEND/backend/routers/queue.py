from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

import models, schemas
from database import get_db

router = APIRouter(
    prefix="/queue",
    tags=["queue"],
)

@router.get("/", response_model=List[schemas.PublishingTask])
def read_queue(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tasks = db.query(models.PublishingTask).offset(skip).limit(limit).all()
    return tasks

@router.post("/", response_model=schemas.PublishingTask)
def create_task(task: schemas.PublishingTaskCreate, db: Session = Depends(get_db)):
    db_task = models.PublishingTask(**task.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task
