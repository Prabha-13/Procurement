from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.database import Base, engine, SessionLocal
from app.models.user import User
from app.security import hash_password

# ROUTES
from app.routes import user
from app.routes import requisition
from app.routes import vendor
from app.routes import purchase_order

app = FastAPI()

# =========================
# CORS CONFIGURATION (FIXED PROPERLY)
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 🔥 Allow all origins (for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# CREATE DATABASE TABLES
# =========================
Base.metadata.create_all(bind=engine)

# =========================
# INCLUDE ROUTERS
# =========================
app.include_router(user.router)
app.include_router(requisition.router)
app.include_router(vendor.router)
app.include_router(purchase_order.router)

# =========================
# DEFAULT USERS CREATION
# =========================
def create_default_users():
    db: Session = SessionLocal()

    if not db.query(User).filter(User.email == "admin@procure.com").first():
        db.add(User(
            name="Admin",
            email="admin@procure.com",
            password_hash=hash_password("admin123"),
            role="Admin"
        ))

    if not db.query(User).filter(User.email == "staff@procure.com").first():
        db.add(User(
            name="Staff",
            email="staff@procure.com",
            password_hash=hash_password("staff123"),
            role="Staff"
        ))

    db.commit()
    db.close()

create_default_users()