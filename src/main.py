from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import routers
import uvicorn

app = FastAPI()
app.include_router(routers.router)

# 允许跨域请求
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/api", StaticFiles(directory="../public"), name="images")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)