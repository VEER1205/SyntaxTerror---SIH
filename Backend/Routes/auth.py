from fastapi import APIRouter,Depends,Responses,HTTPException,status
from Models import LoginRequest,UserRole
from utilities import createAccessToken


router = APIRouter()

router.get("/login")
def userLogin(credentials: LoginRequest,response:Responses):
    if credentials.username != "veer" or credentials.password != "pass@123":
        return HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Incorrect username or password"
        )

    token = createAccessToken(username=credentials.userName, role=UserRole.admin)

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,  
        secure=False,   
        samesite="lax", 
            )
    return {"message": "Login successful"}