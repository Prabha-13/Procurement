from passlib.context import CryptContext
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.user import User

# 🔐 JWT Config
SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"

# 🔑 Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 🔥 IMPORTANT — tokenUrl must match your login route
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


# -----------------------------
# PASSWORD FUNCTIONS
# -----------------------------

def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# -----------------------------
# CREATE ACCESS TOKEN
# -----------------------------

def create_access_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)


# -----------------------------
# DATABASE DEPENDENCY
# -----------------------------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -----------------------------
# GET CURRENT USER (FIXED)
# -----------------------------

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials"
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")   # 🔥 Now treating sub as email

        if email is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    # 🔥 FIX: Query by EMAIL (NOT id)
    user = db.query(User).filter(User.email == email).first()

    if user is None:
        raise credentials_exception

    return user


# -----------------------------
# REQUIRE ADMIN ROLE
# -----------------------------

def require_admin(
    current_user: User = Depends(get_current_user)
):
    if current_user.role.lower() != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    return current_user