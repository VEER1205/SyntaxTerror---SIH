from fastapi import APIRouter,HTTPException,Depends,Query
from database import getDatabase

dashBoardRouter = APIRouter()

@dashBoardRouter.get("/heatmap")
async def get_all_institutes(db = Depends(getDatabase),state: str = Query(None, description="Filter by state name, e.g., Maharashtra")):
    collection = db["Institute"]
    query = {}
    if state:
        query["properties.state"] = {"$regex": f"^{state}$", "$options": "i"}
    
    cursor = collection.find(query, {"_id": 0})
    
    if not state:
        cursor = cursor.limit(500)  
        
    features = await cursor.to_list(length=None)
    
    print(f"DEBUG: Sent {len(features)} institutes to frontend for state: {state or 'All (Limited)'}")
    
    return {
        "type": "FeatureCollection",
        "features": features
    }