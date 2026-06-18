from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class AccountBase(BaseModel):
    platform: str
    connected: bool
    account_name: Optional[str] = None

class AccountCreate(AccountBase):
    pass

class AccountLogin(BaseModel):
    account_name: str

class Account(AccountBase):
    id: int
    user_id: Optional[int] = None

    class Config:
        from_attributes = True

class ContentAssetBase(BaseModel):
    type: str
    title: str
    score: str = "AI Scored"

class ContentAssetCreate(ContentAssetBase):
    pass

class ContentAsset(ContentAssetBase):
    id: int
    created_at: datetime
    user_id: Optional[int] = None

    class Config:
        from_attributes = True

class PublishingTaskBase(BaseModel):
    title: str
    platform: str
    time: str
    status: str

class PublishingTaskCreate(PublishingTaskBase):
    pass

class PublishingTask(PublishingTaskBase):
    id: int
    user_id: Optional[int] = None

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: Optional[str] = None
    full_name: Optional[str] = None
    picture: Optional[str] = None

class UserCreate(UserBase):
    password: Optional[str] = None
    google_id: Optional[str] = None

class GoogleLogin(BaseModel):
    email: str
    google_id: str
    full_name: str
    picture: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

class User(UserBase):
    id: int
    is_active: bool
    accounts: List[Account] = []

    class Config:
        from_attributes = True

class PasswordUpdate(BaseModel):
    email: str
    old_password: Optional[str] = None
    new_password: str

class TwoFactorVerify(BaseModel):
    email: str
    code: str

class TwoFactorRequest(BaseModel):
    email: str
