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
