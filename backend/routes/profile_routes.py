from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorGridFSBucket
import os
from bson import ObjectId

router = APIRouter(prefix="/profile", tags=["profile"])

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'testdb')]
fs = AsyncIOMotorGridFSBucket(db)

@router.post("/upload")
async def upload_profile_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File is not an image.")

    try:
        # Save the file to GridFS
        file_id = await fs.upload_from_stream(
            file.filename,
            file.file,
            metadata={"contentType": file.content_type}
        )
        return {"file_id": str(file_id), "filename": file.filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload image: {e}")

@router.get("/image/{file_id}")
async def get_profile_image(file_id: str):
    try:
        grid_out = await fs.open_download_stream(ObjectId(file_id))
        return StreamingResponse(grid_out, media_type=grid_out.metadata["contentType"])
    except Exception as e:
        raise HTTPException(status_code=404, detail="Image not found.")

@router.get("/latest-image")
async def get_latest_image():
    try:
        # Find the most recently uploaded file
        latest_file = await db.fs.files.find_one({}, sort=[("uploadDate", -1)])
        if latest_file:
            return {"file_id": str(latest_file["_id"])}
        else:
            raise HTTPException(status_code=404, detail="No images found.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch latest image: {e}")
