from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base


class Requisition(Base):
    __tablename__ = "requisitions"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    status = Column(String, default="draft")

    user_id = Column(Integer, ForeignKey("users.id"))