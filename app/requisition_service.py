from fastapi import HTTPException
from app.models.requisition import Requisition
from app.repositories.requisition_repository import RequisitionRepository

class RequisitionService:

    @staticmethod
    def create_requisition(db, title, description, user):
        new_req = Requisition(
            title=title,
            description=description,
            status="pending",
            created_by=user.id
        )

        return RequisitionRepository.create(db, new_req)

    @staticmethod
    def get_my_requisitions(db, user):
        return RequisitionRepository.get_by_user(db, user.id)

    @staticmethod
    def get_all_requisitions(db):
        return RequisitionRepository.get_all(db)

    @staticmethod
    def approve_requisition(db, req_id):
        req = RequisitionRepository.get_by_id(db, req_id)

        if not req:
            raise HTTPException(status_code=404, detail="Not found")

        if req.status != "pending":
            raise HTTPException(status_code=400, detail="Invalid state")

        req.status = "approved"
        RequisitionRepository.update(db)

        return req

    @staticmethod
    def reject_requisition(db, req_id):
        req = RequisitionRepository.get_by_id(db, req_id)

        if not req:
            raise HTTPException(status_code=404, detail="Not found")

        if req.status != "pending":
            raise HTTPException(status_code=400, detail="Invalid state")

        req.status = "rejected"
        RequisitionRepository.update(db)

        return req