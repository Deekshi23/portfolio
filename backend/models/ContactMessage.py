from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import datetime
import uuid

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Sender's name")
    email: str = Field(..., description="Sender's email address")
    subject: str = Field(..., min_length=1, max_length=200, description="Message subject")
    message: str = Field(..., min_length=10, max_length=5000, description="Message content")
    
    @validator('name')
    def validate_name(cls, v):
        if not v or v.isspace():
            raise ValueError('Name cannot be empty or only whitespace')
        return v.strip()
    
    @validator('email')
    def validate_email(cls, v):
        import re
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, v):
            raise ValueError('Invalid email format')
        return v.lower().strip()
    
    @validator('subject')
    def validate_subject(cls, v):
        if not v or v.isspace():
            raise ValueError('Subject cannot be empty or only whitespace')
        return v.strip()
    
    @validator('message')
    def validate_message(cls, v):
        if not v or v.isspace():
            raise ValueError('Message cannot be empty or only whitespace')
        return v.strip()

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    isRead: bool = Field(default=False)
    ipAddress: Optional[str] = None
    userAgent: Optional[str] = None
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class ContactMessageResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None
    errors: Optional[list] = None