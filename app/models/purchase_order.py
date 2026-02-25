from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.sql import func

from app.database import Base


class PurchaseOrder(Base):
    __tablename__ = "purchase_orders"

    id = Column(Integer, primary_key=True, index=True)

    requisition_id = Column(
        Integer,
        ForeignKey("requisitions.id"),
        nullable=False
    )

    vendor_id = Column(
        String,
        ForeignKey("vendors.id"),
        nullable=False
    )

    status = Column(String, default="created")
    created_at = Column(DateTime(timezone=True), server_default=func.now())