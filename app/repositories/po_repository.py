from sqlalchemy.orm import Session
from app.models.purchase_order import PurchaseOrder

class PORepository:

    @staticmethod
    def create(db: Session, po: PurchaseOrder):
        db.add(po)
        db.commit()
        db.refresh(po)
        return po

    @staticmethod
    def get_all(db: Session):
        return db.query(PurchaseOrder).all()

    @staticmethod
    def get_by_id(db: Session, po_id: str):
        return db.query(PurchaseOrder).filter(
            PurchaseOrder.id == po_id
        ).first()

    @staticmethod
    def update(db: Session):
        db.commit()