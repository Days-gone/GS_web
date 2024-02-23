import os
from loguru import logger

next_pic_id = -1
def update_nextid():
    global next_pic_id
    next_pic_id += 1

def ret_nextid():
    if (next_pic_id == -1):
        init_nextid()
        return next_pic_id
    else:
        return next_pic_id

def is_image_file(filename):
    image_extensions = ['.jpg', '.jpeg', '.png']
    ext = os.path.splitext(filename)[1].lower()
    return ext in image_extensions

def init_nextid():
    global next_pic_id
    des_folder = '../public'
    pic_count = 0

    for root, dirs, files in os.walk(des_folder):
        for file in files:
            if is_image_file(file):
                pic_count += 1
    next_pic_id = pic_count + 1
    logger.info(f"Init Next_picid: Has been {pic_count} pics")
