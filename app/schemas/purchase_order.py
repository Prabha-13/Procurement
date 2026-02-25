from pydantic import BaseModel
from uuid import UUID
from datetime import datetime


class PurchaseOrderCreate(BaseModel):
    requisition_id: UUID
    vendor_id: UUID


class PurchaseOrderResponse(BaseModel):
    id: UUID
    requisition_id: UUID
    vendor_id: UUID
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
