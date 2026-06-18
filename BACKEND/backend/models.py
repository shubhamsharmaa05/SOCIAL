from sqlalchemy import Boolean, Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=True) # Nullable for google login
    hashed_password = Column(String, nullable=True)
    google_id = Column(String, unique=True, index=True, nullable=True)
    full_name = Column(String, nullable=True)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    picture = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    totp_secret = Column(String, nullable=True)
    is_totp_enabled = Column(Boolean, default=False)

    accounts = relationship("Account", back_populates="owner")
    content_assets = relationship("ContentAsset", back_populates="owner")
    publishing_tasks = relationship("PublishingTask", back_populates="owner")

class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String, index=True) # e.g., "Instagram", "LinkedIn"
    connected = Column(Boolean, default=False)
    account_name = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    owner = relationship("User", back_populates="accounts")

class ContentAsset(Base):
    __tablename__ = "content_assets"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String) # "image" or "video"
    title = Column(String)
    score = Column(String, default="AI Scored")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="content_assets")

class PublishingTask(Base):
    __tablename__ = "publishing_tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    platform = Column(String)
    time = Column(String) # For simplicity, storing string like "Tomorrow, 9:00 AM"
    status = Column(String) # "publishing", "scheduled", "published", "failed"
    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="publishing_tasks")
