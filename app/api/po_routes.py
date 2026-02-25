from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.core.dependencies import admin_required
from app.services.po_service import POService
from app.schemas.purchase_order import PurchaseOrderCreate, PurchaseOrderResponse

router = APIRouter(prefix="/purchase-orders", tags=["Purchase Orders"])


@router.post("/", response_model=PurchaseOrderResponse)
def create_po(
    data: PurchaseOrderCreate,
    db: Session = Depends(get_db),
    user = Depends(admin_required)
):
    return POService.create_po(
        db,
        data.requisition_id,
        data.vendor_id
    )


@router.get("/", response_model=list[PurchaseOrderResponse])
def get_all_pos(
    db: Session = Depends(get_db),
    user = Depends(admin_required)
):
    return POService.get_all_pos(db)