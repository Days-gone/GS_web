from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from starlette.status import HTTP_201_CREATED
from loguru import logger
from pathlib import Path
import service

router = APIRouter()
router.prefix = "/api"
images_dir = Path("../public")
default_image_path = Path("../public/error.jpg")

@router.get("")
async def root():
    return JSONResponse({"API Test": "Success"})

@router.get("/img_total")
async def get_num_imgs():
    return JSONResponse({"total":service.ret_nextid() - 1})

@router.get("/img/{pic_id}")
async def get_pic_by_id(pic_id: int = 1):
    logger.info(f"get request from client, id is {pic_id}")
    file_path = images_dir / f"{pic_id:03d}.jpg"
    
    if not file_path.is_file():
        return FileResponse(default_image_path, filename="error.jpg")
    
    logger.info(f"Returning image: {file_path}")
    return FileResponse(file_path, filename="resp.jpg")

@router.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_content = await file.read()
        file_path = images_dir / f"{service.ret_nextid():03d}.jpg"
        # file_path = images_dir / file.filename
        with open(file_path, "wb") as f:
            f.write(file_content)
        service.update_nextid()
        return JSONResponse(status_code=HTTP_201_CREATED, content={"message": "File uploaded successfully"})
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to upload file: {e}")