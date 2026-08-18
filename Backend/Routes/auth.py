from fastapi import APIRouter, Depends, Response, HTTPException, status
from Models import LoginRequest, UserRole, SignupRequest
from utilities import createAccessToken, verifyPassword, hashPassword, getCurrentUserFromCookie
from database import getDatabase

router = APIRouter()

@router.post("/login")
async def userLogin(credentials: LoginRequest, response: Response, db = Depends(getDatabase)):
    try:
        
        user = await db["user"].find_one(
            {"$or":[
                {"userName": credentials.identifier},
                {"email": credentials.identifier}
            ]}
        )
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password" 
            )   

        
        try:
            isValid = verifyPassword(hashPassword=user["hashPassword"], password=credentials.password)
            if not isValid:
                raise ValueError() 
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, 
                detail="Incorrect username or password"
            )

        # Fix: use credentials.identifier (not credentials.userName which doesn't exist)
        token = createAccessToken(userName=credentials.identifier, role=user["role"])

        response.set_cookie(
            key="access_token",
            value=token,
            httponly=True,  
            secure=False,   
            samesite="lax", 
        )
        return {"message": "Login successful", "role": user["role"]}

    except HTTPException:
        raise 
    except Exception as e:
       
        print(f"Login Route Error: {e}") 
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An internal server error occurred"
        )


@router.post("/signup")
async def userSignup(credentials: SignupRequest, db = Depends(getDatabase)):
    try:
       
        user = await db["user"].find_one({"userName": credentials.userName})
        if user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User Name Is Already Taken"
            )

       
        hashed_pw = hashPassword(credentials.password)

     
        newUser = {
            "userName": credentials.userName,
            "email": credentials.email,
            "hashPassword": hashed_pw,
            "role": credentials.role.value
        }

        
        await db["user"].insert_one(newUser)

        return {"message": "User created successfully. Please log in."}

    
    except HTTPException:
        raise
    except Exception as e:
        print(f"Signup Route Error: {e}") 
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not create user at this time. Please try again."
        )


@router.get("/me")
async def getMe(user: dict = Depends(getCurrentUserFromCookie)):
    """Returns the current authenticated user's info from the JWT cookie."""
    return {"userName": user["username"], "role": user["role"]}


@router.post("/logout")
async def logout(response: Response):
    """Clears the access_token cookie to log the user out."""
    response.delete_cookie(key="access_token", samesite="lax")
    return {"message": "Logged out successfully"}