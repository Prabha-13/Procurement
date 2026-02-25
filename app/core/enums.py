from enum import Enum

class PurchaseOrderStatus(str, Enum):
    CREATED = "created"
    SENT = "sent"
    RECEIVED = "received"
    COMPLETED = "completed"