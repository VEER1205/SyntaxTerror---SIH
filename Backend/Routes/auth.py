from fastapi import APIRouter,Depends,Response,HTTPException,status
from Models import LoginRequest,UserRole,SignupRequest
from utilities import createAccessToken,verifyPassword,hashPassword
from database import getDatabase


router = APIRouter()

@router.post("/login")
def userLogin(credentials: LoginRequest,response:Response,db = Depends(getDatabase)):

    user = db["user"].find_one({"userName": credentials.userName})

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User Not Found"
        )   

    if credentials.userName != user["userName"] or not verifyPassword(hashPassword=user["hashPassword"],password=credentials.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Incorrect username or password"
        )

    token = createAccessToken(userName=credentials.userName, role=user["role"])

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,  
        secure=False,   
        samesite="lax", 
            )
    return {"message": "Login successful"}


@router.post("/signup")
def userSignup(credentials:SignupRequest,db = Depends(getDatabase)):
    user = db.find_one({"userName": credentials.name})

    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User Name Is Already Taken"
        )

    hashed_pw = hashPassword(credentials.Password)

    newUser = {
        "userName":credentials.name,
        "email":credentials.email,
        "hashPassword":hashed_pw,
        "role":credentials.role
    }

    db["user"].insert_one(newUser)

    return {"message": "User created successfully. Please log in."}

