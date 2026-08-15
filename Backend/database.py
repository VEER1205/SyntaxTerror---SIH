from motor.motor_asyncio import AsyncIOMotorClient
from config import settings
import json

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

# async def uploadCollage():
#     database = getDatabase()
#     collection = database["Institute"]

#     # 1. Load your generated hybrid dataset JSON file
#     filename = r"D:\code1\SyntaxTerror---SIH\Backend\test\mock_aicte_comprehensive_dataset.json"
#     try:
#         with open(filename, 'r', encoding='utf-8') as f:
#             geojson_data = json.load(f)
#     except FileNotFoundError:
#         print(f"Error: Could not find '{filename}'. Run your dataset generator script first.")
#         return

#     features = geojson_data.get("features", [])
#     if not features:
#         print("Error: No features found in the JSON file.")
#         return

#     # 2. Clear old test documents and insert new ones asynchronously
#     await collection.delete_many({})
    
#     # Motor insert_many requires 'await'
#     result = await collection.insert_many(features)
#     print(f"Successfully inserted {len(result.inserted_ids)} colleges into the 'Institute' collection!")

#     # 3. Create the 2dsphere index for rapid spatial/map queries
#     await collection.create_index([("geometry", "2dsphere")])
#     print("Geospatial 2dsphere index created successfully.")

# if __name__ == "__main__":
#     import asyncio

#     async def main():
#         await connectMongo()
#         await uploadCollage()
#         await closeMongoConnection()

#     asyncio.run(main())