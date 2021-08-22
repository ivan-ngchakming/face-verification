import cv2
import numpy as np
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .arcface import face_app
from .arcface.utils import cosine_similarity


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


face_app.init_models()

@app.get('/')
def index():
    return "Index"


@app.get('/api/ping')
def ping():
    return {'data': "pong"}


@app.post('/api/verify')
async def verify(file1: UploadFile = File(...), file2: UploadFile = File(...)):
    img1 = await file1.read()
    img2 = await file2.read()

    img_arr_1 = np.fromstring(img1, np.uint8)
    img_arr_2 = np.fromstring(img2, np.uint8)

    cvimg1 = cv2.imdecode(img_arr_1, cv2.IMREAD_COLOR)
    cvimg2 = cv2.imdecode(img_arr_2, cv2.IMREAD_COLOR)
    faces = [face_app.get(img)[0] for img in [cvimg1, cvimg2]]
    embedding = [face.embedding for face in faces]
    score = cosine_similarity(*embedding)

    return {
        'score': float(score),
    }

app.mount("/", StaticFiles(directory='./build', html=True), name="static")
