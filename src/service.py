import os
from loguru import logger
from pathlib import Path

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

next_pic_id = -1


def update_nextid():
    global next_pic_id
    next_pic_id += 1


def ret_nextid():
    if next_pic_id == -1:
        init_nextid()
        return next_pic_id
    else:
        return next_pic_id


def is_image_file(filename):
    if filename.find('error') != -1:
        return False
    image_extensions = ['.jpg', '.jpeg', '.png']
    ext = os.path.splitext(filename)[1].lower()
    return ext in image_extensions


def init_nextid():
    global next_pic_id
    des_folder = '../public/ori'
    pic_count = 0

    for root, dirs, files in os.walk(des_folder):
        for file in files:
            if is_image_file(file):
                pic_count += 1
    next_pic_id = pic_count + 1
    logger.info(f"Init Next_picid: Has been {pic_count} pics")



async def send_image_to_server(image_path : str, picture_id : int):
    """Send image to server for processing."""
    try:
        # Read the image file
        with open(image_path, "rb") as f:
            image_data = f.read()

        # Prepare form data
        files = {"image_file": ("image.jpg", image_data, "image/jpeg")}
        data = {"client_ip": settings.CLIENT_IP, "pictureID": picture_id}

        # Send request to server
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(
                SERVER_URL,
                files=files,
                data=data
            )
            response.raise_for_status()
            
        logger.info(f"Server response: {response.json()}")
        return response.json()
    except Exception as e:
        logger.error(f"Failed to send image to server: {str(e)}")
        return None

async def save_result_images(filelist : list, metadata: dict):
    """
    Save processed images to disk.
    Args:
        filelist: List of uploaded files.
    Returns:
        True if images are saved successfully, False otherwise.
    """
    try:
        pic_id = metadata['pictureID']
        mask_data = await filelist[0].read()
        overlay_data = await filelist[1].read()
        transparent_data = await filelist[2].read()
        boundary_data = await filelist[3].read()

        # Convert bytes to numpy arrays
        mask_array = np.frombuffer(mask_data, np.uint8)
        overlay_array = np.frombuffer(overlay_data, np.uint8)
        transparent_array = np.frombuffer(transparent_data, np.uint8)
        boundary_array = np.frombuffer(boundary_data, np.uint8)

        # Decode images
        mask_img = cv2.imdecode(mask_array, cv2.IMREAD_COLOR)
        overlay_img = cv2.imdecode(overlay_array, cv2.IMREAD_COLOR)
        transparent_img = cv2.imdecode(transparent_array, cv2.IMREAD_COLOR)
        boundary_img = cv2.imdecode(boundary_array, cv2.IMREAD_COLOR)

        # Save processed images
        mask_path = mas_dir / f"{pic_id}.png"
        overlay_path = ove_dir / f"{pic_id}.png"
        transparent_path = tra_dir / f"{pic_id}.png"
        boundary_path = bou_dir / f"{pic_id}.png"

        cv2.imwrite(mask_path, mask_img)
        cv2.imwrite(overlay_path, overlay_img)
        cv2.imwrite(transparent_path, transparent_img)
        cv2.imwrite(boundary_path, boundary_img)

        logger.info(f"Processed images saved: {overlay_path}, {boundary_path}, {mask_path}, {transparent_path}")
        return True
    except Exception as e:
        logger.error(f"Error processing callback: {str(e)}")
        return False
