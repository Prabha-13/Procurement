from pydantic import BaseModel, EmailStr
from uuid import UUID


class VendorCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    company: str


class VendorResponse(BaseModel):
    id: UUID
    name: str
    email: str
    phone: str
    company: str

    class Config:
        from_attributes = True
