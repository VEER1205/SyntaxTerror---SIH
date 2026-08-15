from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

class Database:
    client: AsyncIOMotorClient = None

db = Database()

async def connectMongo():
    db.client = AsyncIOMotorClient(settings.MONGODB_URL)
    print("Conneted to MongoDB!")

async def closeMongoConnection():
    if db.client:
        db.client.close()
        print("Closed MongoDB Connection")

def getDatabase():
    return db.client[settings.DATABASE_NAME]

