from sqlalchemy.orm import Session
from app.models.requisition import Requisition

class RequisitionRepository:

    @staticmethod
    def create(db: Session, requisition: Requisition):
        db.add(requisition)
        db.commit()
        db.refresh(requisition)
        return requisition

    @staticmethod
    def get_by_id(db: Session, req_id: str):
        return db.query(Requisition).filter(Requisition.id == req_id).first()

    @staticmethod
    def get_by_user(db: Session, user_id: str):
        return db.query(Requisition).filter(
            Requisition.created_by == user_id
        ).all()

    @staticmethod
    def get_all(db: Session):
        return db.query(Requisition).all()

    @staticmethod
    def update(db: Session):
        db.commit()