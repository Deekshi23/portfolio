from typing import List, Optional
from datetime import datetime
from models.ContactMessage import ContactMessage, ContactMessageCreate
from motor.motor_asyncio import AsyncIOMotorDatabase
import logging

logger = logging.getLogger(__name__)

class ContactService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.contact_messages
    
    async def create_message(self, message_data: ContactMessageCreate, ip_address: str = None, user_agent: str = None) -> ContactMessage:
        """
        Create a new contact message and store it in the database
        """
        try:
            # Create ContactMessage instance
            contact_message = ContactMessage(
                **message_data.dict(),
                ipAddress=ip_address,
                userAgent=user_agent
            )
            
            # Insert into database
            message_dict = contact_message.dict()
            message_dict['_id'] = message_dict.pop('id')  # Use id as _id for MongoDB
            
            result = await self.collection.insert_one(message_dict)
            
            if result.inserted_id:
                logger.info(f"Contact message created successfully: {contact_message.id}")
                return contact_message
            else:
                raise Exception("Failed to insert message into database")
                
        except Exception as e:
            logger.error(f"Error creating contact message: {str(e)}")
            raise e
    
    async def get_all_messages(self, skip: int = 0, limit: int = 100) -> List[dict]:
        """
        Retrieve all contact messages from the database
        """
        try:
            cursor = self.collection.find({}).sort("timestamp", -1).skip(skip).limit(limit)
            messages = []
            
            async for message in cursor:
                # Convert _id back to id
                message['id'] = message.pop('_id')
                messages.append(message)
            
            return messages
            
        except Exception as e:
            logger.error(f"Error retrieving messages: {str(e)}")
            raise e
    
    async def get_message_count(self) -> int:
        """
        Get total count of messages
        """
        try:
            return await self.collection.count_documents({})
        except Exception as e:
            logger.error(f"Error counting messages: {str(e)}")
            return 0
    
    async def mark_message_as_read(self, message_id: str) -> bool:
        """
        Mark a message as read
        """
        try:
            result = await self.collection.update_one(
                {"_id": message_id},
                {"$set": {"isRead": True}}
            )
            return result.modified_count > 0
        except Exception as e:
            logger.error(f"Error marking message as read: {str(e)}")
            return False
    
    async def delete_message(self, message_id: str) -> bool:
        """
        Delete a message
        """
        try:
            result = await self.collection.delete_one({"_id": message_id})
            return result.deleted_count > 0
        except Exception as e:
            logger.error(f"Error deleting message: {str(e)}")
            return False