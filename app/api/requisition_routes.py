from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.core.dependencies import get_current_user, admin_required
from app.services.requisition_service import RequisitionService
from app.schemas.requisition import RequisitionCreate, RequisitionResponse

router = APIRouter(prefix="/requisitions", tags=["Requisitions"])


@router.post("/", response_model=RequisitionResponse)
def create_requisition(
    data: RequisitionCreate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    return RequisitionService.create_requisition(
        db,
        data.title,
        data.description,
        user
    )


@router.get("/my", response_model=list[RequisitionResponse])
def my_requisitions(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    return RequisitionService.get_my_requisitions(db, user)


@router.get("/", response_model=list[RequisitionResponse])
def all_requisitions(
    db: Session = Depends(get_db),
    user = Depends(admin_required)
):
    return RequisitionService.get_all_requisitions(db)


@router.put("/{req_id}/approve")
def approve_requisition(
    req_id: str,
    db: Session = Depends(get_db),
    user = Depends(admin_required)
):
    return RequisitionService.approve_requisition(db, req_id)


@router.put("/{req_id}/reject")
def reject_requisition(
    req_id: str,
    db: Session = Depends(get_db),
    user = Depends(admin_required)
):
    return RequisitionService.reject_requisition(db, req_id)