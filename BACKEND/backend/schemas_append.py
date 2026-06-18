class PasswordUpdate(BaseModel):
    email: str
    old_password: Optional[str] = None
    new_password: str

class TwoFactorVerify(BaseModel):
    email: str
    code: str

class TwoFactorRequest(BaseModel):
    email: str
