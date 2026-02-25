from pydantic import BaseModel
from uuid import UUID
from datetime import datetime


class RequisitionCreate(BaseModel):
    title: str
    description: str


class RequisitionResponse(BaseModel):
    id: UUID
    title: str
    description: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True