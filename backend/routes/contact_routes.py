from fastapi import APIRouter, HTTPException, Request, Depends
from models.ContactMessage import ContactMessageCreate, ContactMessageResponse
from services.contact_service import ContactService
from motor.motor_asyncio import AsyncIOMotorDatabase
import os
from motor.motor_asyncio import AsyncIOMotorClient
import logging

logger = logging.getLogger(__name__)

# Create router
router = APIRouter(prefix="/contact", tags=["contact"])

# Database dependency
async def get_database():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    return db

async def get_contact_service():
    db = await get_database()
    return ContactService(db)

@router.post("/message", response_model=ContactMessageResponse)
async def submit_contact_message(
    message_data: ContactMessageCreate,
    request: Request,
    contact_service: ContactService = Depends(get_contact_service)
):
    """
    Submit a new contact message
    """
    try:
        # Extract client information
        client_ip = request.client.host if request.client else "unknown"
        user_agent = request.headers.get("user-agent", "unknown")
        
        # Create the message
        created_message = await contact_service.create_message(
            message_data=message_data,
            ip_address=client_ip,
            user_agent=user_agent
        )
        
        return ContactMessageResponse(
            success=True,
            message="Message sent successfully! Thank you for reaching out. I'll get back to you soon.",
            data={
                "id": created_message.id,
                "timestamp": created_message.timestamp.isoformat()
            }
        )
        
    except ValueError as ve:
        # Validation errors
        logger.warning(f"Validation error in contact form: {str(ve)}")
        raise HTTPException(
            status_code=400,
            detail={
                "success": False,
                "message": "Validation error",
                "errors": [str(ve)]
            }
        )
    except Exception as e:
        # Server errors
        logger.error(f"Server error in contact form submission: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "success": False,
                "message": "Internal server error. Please try again later.",
                "errors": ["Server error occurred"]
            }
        )

@router.get("/messages")
async def get_contact_messages(
    skip: int = 0,
    limit: int = 100,
    contact_service: ContactService = Depends(get_contact_service)
):
    """
    Get all contact messages (for admin/portfolio owner)
    """
    try:
        messages = await contact_service.get_all_messages(skip=skip, limit=limit)
        total_count = await contact_service.get_message_count()
        
        return {
            "success": True,
            "data": messages,
            "total": total_count,
            "skip": skip,
            "limit": limit
        }
        
    except Exception as e:
        logger.error(f"Error retrieving messages: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "success": False,
                "message": "Failed to retrieve messages",
                "errors": [str(e)]
            }
        )

@router.patch("/messages/{message_id}/read")
async def mark_message_read(
    message_id: str,
    contact_service: ContactService = Depends(get_contact_service)
):
    """
    Mark a message as read
    """
    try:
        success = await contact_service.mark_message_as_read(message_id)
        
        if success:
            return {
                "success": True,
                "message": "Message marked as read"
            }
        else:
            raise HTTPException(
                status_code=404,
                detail={
                    "success": False,
                    "message": "Message not found"
                }
            )
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error marking message as read: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "success": False,
                "message": "Failed to update message",
                "errors": [str(e)]
            }
        )