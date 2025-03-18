from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from fastapi.responses import FileResponse, JSONResponse
from starlette.status import HTTP_201_CREATED
from loguru import logger
from pathlib import Path
from service import images_dir, ori_dir, mas_dir, ove_dir, tra_dir, bou_dir, def_dir
import service

router = APIRouter()
router.prefix = "/api"
images_dir = Path("../public")

# Original Dir
ori_dir = Path("../public/ori")
# Mask Dir
mas_dir = Path("../public/mask")
# Overlay Dir
ove_dir = Path("../public/ove")
# Transparent Dir
tra_dir = Path("../public/tra")
# Boundary Dir
bou_dir = Path("../public/bou")
# Defualt Dir
def_dir = Path("../public/def")


@router.get("")
async def root():
    return JSONResponse({"API Test": "Success"})


@router.get("/img_total")
async def get_num_imgs():
    return JSONResponse({"total": int(service.ret_nextid() - 1)})


@router.get("/img/{pic_id}")
async def get_pic_by_id(pic_id: int = 1, tab: str = "ori"):
    logger.info(f"Get Request: [{pic_id},{tab}]")

    # Default Image Path
    file_path = ori_dir / f"{pic_id}.png"
    if tab == "ori":
        file_path = ori_dir / f"{pic_id:03d}.png"
    elif tab == "mas":
        file_path = mas_dir / f"{pic_id:03d}.png"
    elif tab == "ove":
        file_path = ove_dir / f"{pic_id:03d}.png"
    elif tab == "tra":
        file_path = tra_dir / f"{pic_id:03d}.png"
    elif tab == "bou":
        file_path = bou_dir / f"{pic_id:03d}.png"
    else:
        file_path = def_dir / f"{pic_id:03d}.png"

    logger.info(f"Get Image Path: [{file_path}]")
    if not file_path.is_file():
        return FileResponse(def_dir, filename="error.jpg")

    logger.info(f"Return Image: {file_path}")
    return FileResponse(file_path, filename="resp.png")


@router.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_content = await file.read()
        pic_id = service.ret_nextid()
        # Default set the file is original image
        file_path = ori_dir / f"{pic_id:03d}.png"
        with open(file_path, "wb") as f:
            f.write(file_content)
        service.update_nextid()
        # transform the picture to DL server
        # send the picture to the DL server, obtain a series of picture
        # save them into corresponding dirs
        res = await service.send_image_to_server(file_path, pic_id)

        if res:
            logger.info(f"Uploaded Successfully: {file_path}")
        else :
            logger.error(f"Failed to upload file: {file_path}")

        return JSONResponse(status_code=HTTP_201_CREATED, content={"message": "Uploaded Successfully",
                                                                   "pid": f"{service.ret_nextid():03d}"})
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to upload file: {e}")


@router.post("/callback")
async def receive_processed_images(
    mask: UploadFile = File(...),
    overlay: UploadFile = File(...),
    transparent: UploadFile = File(...),
    boundary: UploadFile = File(...),
    metadata : dict = Form(...),
):
    filelist = [mask, overlay, transparent, boundary]
    metadata = json.loads(metadata)
    result = series.save_result_images(filelist, metadata)
    if result:
        return JSONResponse(
            status_code=200,
            content={"status": "images_received_and_processed"}
        )
    else:
        return JSONResponse(status_code=500, content={"error": str(e)})
