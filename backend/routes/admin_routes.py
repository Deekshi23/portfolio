from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
import os
from bson import ObjectId
from typing import List, Dict, Any

router = APIRouter(prefix="/admin", tags=["admin"])

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'testdb')]

@router.get("/collections", response_model=List[str])
async def get_collections():
    return await db.list_collection_names()

@router.get("/collections/{collection_name}", response_model=List[Dict[str, Any]])
async def get_documents(collection_name: str):
    # Sanitize collection_name to prevent injection
    if not collection_name.isalnum():
        raise HTTPException(status_code=400, detail="Invalid collection name")
    collection = db[collection_name]
    documents = await collection.find().to_list(1000)
    # Convert ObjectId to string
    for doc in documents:
        doc["_id"] = str(doc["_id"])
    return documents

@router.post("/collections/{collection_name}")
async def add_document(collection_name: str, document: Dict[str, Any]):
    if not collection_name.isalnum():
        raise HTTPException(status_code=400, detail="Invalid collection name")
    collection = db[collection_name]
    result = await collection.insert_one(document)
    return {"_id": str(result.inserted_id)}

@router.delete("/collections/{collection_name}/{document_id}")
async def delete_document(collection_name: str, document_id: str):
    if not collection_name.isalnum():
        raise HTTPException(status_code=400, detail="Invalid collection name")
    collection = db[collection_name]
    result = await collection.delete_one({"_id": ObjectId(document_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Document not found")
    return {"status": "success"}
