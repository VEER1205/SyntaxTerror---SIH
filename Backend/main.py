from fastapi import FastAPI
from contextlib import asynccontextmanager
from Routes.auth import router
from Routes.dashBoard import dashBoardRouter
from database import connectMongo,closeMongoConnection

@asynccontextmanager
async def lifespan(app:FastAPI):
    await connectMongo()
    yield
    await closeMongoConnection()

app = FastAPI(lifespan=lifespan)

@app.get("/")
def index():
    return {"message":"BACKEND IS ONLINE"}

app.include_router(router=router,prefix="/Auth",tags=["Auth"])
app.include_router(router=dashBoardRouter,prefix="/public",tags=["Public heatmap"])