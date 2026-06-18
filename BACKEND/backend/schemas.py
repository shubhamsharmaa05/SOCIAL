from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List, Any
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(cls, _source_type: Any, _handler: Any):
        from pydantic_core import core_schema
        return core_schema.json_or_python_schema(
            json_schema=core_schema.str_schema(),
            python_schema=core_schema.union_schema([
                core_schema.is_instance_schema(ObjectId),
                core_schema.chain_schema([
                    core_schema.str_schema(),
                    core_schema.no_info_plain_validator_function(cls.validate)
                ])
            ]),
            serialization=core_schema.plain_serializer_function_ser_schema(str)
        )

    @classmethod
    def validate(cls, value):
        if not ObjectId.is_valid(value):
            raise ValueError("Invalid ObjectId")
        return ObjectId(value)

class AccountBase(BaseModel):
    platform: str
    connected: bool
    account_name: Optional[str] = None

class AccountCreate(AccountBase):
    pass

class AccountLogin(BaseModel):
    account_name: str

class Account(AccountBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    user_id: Optional[str] = None
    model_config = ConfigDict(populate_by_name=True)

class ContentAssetBase(BaseModel):
    type: str
    title: str
    score: str = "AI Scored"

class ContentAssetCreate(ContentAssetBase):
    pass

class ContentAsset(ContentAssetBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    user_id: Optional[str] = None
    model_config = ConfigDict(populate_by_name=True)

class PublishingTaskBase(BaseModel):
    title: str
    platform: str
    time: str
    status: str

class PublishingTaskCreate(PublishingTaskBase):
    pass

class PublishingTask(PublishingTaskBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    user_id: Optional[str] = None
    model_config = ConfigDict(populate_by_name=True)

class UserBase(BaseModel):
    email: Optional[str] = None
    full_name: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    picture: Optional[str] = None

class UserCreate(UserBase):
    password: Optional[str] = None
    google_id: Optional[str] = None

class GoogleLogin(BaseModel):
    email: str
    google_id: str
    full_name: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    picture: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

class User(UserBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    is_active: bool = True
    accounts: List[Account] = []
    google_id: Optional[str] = None
    hashed_password: Optional[str] = None
    totp_secret: Optional[str] = None
    is_totp_enabled: bool = False
    model_config = ConfigDict(populate_by_name=True)

class PasswordUpdate(BaseModel):
    email: str
    old_password: Optional[str] = None
    new_password: str

class TwoFactorVerify(BaseModel):
    email: str
    code: str

class TwoFactorRequest(BaseModel):
    email: str
