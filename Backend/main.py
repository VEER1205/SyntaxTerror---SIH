from fastapi import FastAPI
from contextlib import asynccontextmanager
from Routes.auth import router
from Routes.dashBoard import dashBoardRouter
from database import connectMongo,closeMongoConnection
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app:FastAPI):
    await connectMongo()
    yield
    await closeMongoConnection()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:8080",     # Vite TanStack Start default
        "http://localhost:8081",     # Vite fallback when 8080 is in use
        "http://localhost:8082",     # extra fallback
        "http://localhost:4173",     # vite preview
        "https://your-app.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def index():
    return {"message":"BACKEND IS ONLINE"}

app.include_router(router=router,prefix="/Auth",tags=["Auth"])
app.include_router(router=dashBoardRouter,prefix="/public",tags=["Public heatmap"])