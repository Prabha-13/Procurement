from fastapi import HTTPException
from app.models.purchase_order import PurchaseOrder
from app.repositories.po_repository import PORepository
from app.repositories.requisition_repository import RequisitionRepository
from app.repositories.vendor_repository import VendorRepository
from app.core.enums import PurchaseOrderStatus

class POService:

    @staticmethod
    def create_po(db, requisition_id, vendor_id):

        requisition = RequisitionRepository.get_by_id(db, requisition_id)
        if not requisition:
            raise HTTPException(status_code=404, detail="Requisition not found")

        if requisition.status != "approved":
            raise HTTPException(status_code=400, detail="Requisition not approved")

        vendor = VendorRepository.get_by_id(db, vendor_id)
        if not vendor:
            raise HTTPException(status_code=404, detail="Vendor not found")

        new_po = PurchaseOrder(
            requisition_id=requisition_id,
            vendor_id=vendor_id,
            status=PurchaseOrderStatus.CREATED
        )

        return PORepository.create(db, new_po)

    @staticmethod
    def get_all_pos(db):
        return PORepository.get_all(db)