from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.purchase_order import PurchaseOrder
from app.security import require_admin

router = APIRouter(prefix="/purchase-orders", tags=["Purchase Orders"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/all")
def get_all(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return db.query(PurchaseOrder).all()