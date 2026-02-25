from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.requisition import Requisition
from app.models.purchase_order import PurchaseOrder
from app.models.vendor import Vendor
from app.models.user import User
from app.security import get_current_user

router = APIRouter(prefix="/requisitions", tags=["Requisitions"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -----------------------
# CREATE REQUISITION
# -----------------------
@router.post("/")
def create_requisition(
    data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    req = Requisition(
        title=data["title"],
        description=data["description"],
        user_id=current_user.id,
        status="draft"
    )
    db.add(req)
    db.commit()
    db.refresh(req)
    return req


# -----------------------
# STAFF - GET OWN
# -----------------------
@router.get("/my")
def get_my(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Requisition).filter(
        Requisition.user_id == current_user.id
    ).all()


# -----------------------
# ADMIN - GET ALL
# -----------------------
@router.get("/all")
def get_all(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role.lower() != "admin":
        raise HTTPException(status_code=403, detail="Admin only")

    return db.query(Requisition).all()


# -----------------------
# SUBMIT
# -----------------------
@router.put("/{req_id}/submit")
def submit(
    req_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    req = db.query(Requisition).filter(
        Requisition.id == req_id
    ).first()

    if not req:
        raise HTTPException(status_code=404, detail="Requisition not found")

    req.status = "pending"
    db.commit()

    return {"message": "Submitted Successfully"}


# -----------------------
# APPROVE (AUTO VENDOR)
# -----------------------
@router.put("/{req_id}/approve")
def approve(
    req_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role.lower() != "admin":
        raise HTTPException(status_code=403, detail="Admin only")

    req = db.query(Requisition).filter(
        Requisition.id == req_id
    ).first()

    if not req:
        raise HTTPException(status_code=404, detail="Requisition not found")

    # 🔥 Automatically assign first vendor
    vendor = db.query(Vendor).first()

    if not vendor:
        raise HTTPException(status_code=400, detail="No vendors available")

    req.status = "approved"

    po = PurchaseOrder(
        requisition_id=req.id,
        vendor_id=vendor.id,
        status="created"
    )

    db.add(po)
    db.commit()

    return {"message": "Approved & PO Created Successfully"}


# -----------------------
# REJECT
# -----------------------
@router.put("/{req_id}/reject")
def reject(
    req_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    req = db.query(Requisition).filter(
        Requisition.id == req_id
    ).first()

    if not req:
        raise HTTPException(status_code=404, detail="Requisition not found")

    req.status = "rejected"
    db.commit()

    return {"message": "Rejected Successfully"}