from sqlalchemy import Column, String
import uuid

from app.database import Base


class Vendor(Base):
    __tablename__ = "vendors"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String)
    email = Column(String)
    phone = Column(String)
    company = Column(String)