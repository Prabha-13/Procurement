from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import SessionLocal
from app.models.vendor import Vendor
from app.models.user import User
from app.schemas.vendor import VendorCreate, VendorResponse
from app.security import get_current_user, require_admin

router = APIRouter(prefix="/vendors", tags=["Vendors"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------------------
# Admin: Create Vendor
# ---------------------------
@router.post("/", response_model=VendorResponse)
def create_vendor(
    data: VendorCreate,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):

    vendor = Vendor(
        name=data.name,
        email=data.email,
        phone=data.phone,
        company=data.company
    )

    db.add(vendor)
    db.commit()
    db.refresh(vendor)

    return vendor


# ---------------------------
# View All Vendors (Staff + Admin)
# ---------------------------
@router.get("/", response_model=List[VendorResponse])
def get_vendors(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    return db.query(Vendor).all()


# ---------------------------
# Admin: Update Vendor
# ---------------------------
@router.put("/{vendor_id}", response_model=VendorResponse)
def update_vendor(
    vendor_id: str,
    data: VendorCreate,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):

    vendor = db.query(Vendor).filter(Vendor.id == vendor_id).first()

    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")

    vendor.name = data.name
    vendor.email = data.email
    vendor.phone = data.phone
    vendor.company = data.company

    db.commit()
    db.refresh(vendor)

    return vendor


# ---------------------------
# Admin: Delete Vendor
# ---------------------------
@router.delete("/{vendor_id}")
def delete_vendor(
    vendor_id: str,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):

    vendor = db.query(Vendor).filter(Vendor.id == vendor_id).first()

    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")

    db.delete(vendor)
    db.commit()

    return {"message": "Vendor deleted successfully"}
