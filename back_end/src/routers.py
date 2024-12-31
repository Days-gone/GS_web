from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from starlette.status import HTTP_201_CREATED
from loguru import logger
from pathlib import Path
import service

router = APIRouter()
router.prefix = "/api"
images_dir = Path("../public")
ori_dir = Path("../public/ori")
cam_dir = Path("../public/cam")
glcm_dir = Path("../public/glcm")
default_image_path = Path("../public/error.jpg")


@router.get("")
async def root():
    return JSONResponse({"API Test": "Success"})


@router.get("/img_total")
async def get_num_imgs():
    return JSONResponse({"total": int(service.ret_nextid() - 1)})


@router.get("/img/{pic_id}")
async def get_pic_by_id(pic_id: int = 1, tab: str = "ori"):
    logger.info(f"Get Request: [{pic_id},{tab}]")
    file_path = ori_dir / f"{pic_id}.png"
    if tab == "ori":
        file_path = ori_dir / f"{pic_id:03d}.png"
    elif tab == "glcm":
        file_path = glcm_dir / f"{pic_id:03d}.png"
    elif tab == "cam":
        file_path = cam_dir / f"{pic_id:03d}.png"
    logger.info(f"Get Image Path: [{file_path}]")
    if not file_path.is_file():
        return FileResponse(default_image_path, filename="error.jpg")

    logger.info(f"Return Image: {file_path}")
    return FileResponse(file_path, filename="resp.png")


@router.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_content = await file.read()
        file_path = images_dir / f"{service.ret_nextid():03d}.png"
        with open(file_path, "wb") as f:
            f.write(file_content)
        service.update_nextid()
        # transform the picture to DL server
        # send the picture to the DL server, obtain a series of picture
        # save them into corresponding dirs
        return JSONResponse(status_code=HTTP_201_CREATED, content={"message": "Uploaded Successfully",
                                                                   "pid": f"{service.ret_nextid():03d}"})
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to upload file: {e}")
