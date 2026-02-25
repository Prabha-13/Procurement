from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from jose import jwt
from app.db.session import get_db
from app.security import oauth2_scheme, SECRET_KEY, ALGORITHM
from app.repositories.user_repository import UserRepository

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = UserRepository.get_by_id(db, user_id)

    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user


def admin_required(user = Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    return user