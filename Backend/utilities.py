import jwt
from Models import UserRole
from config import settings
from pydantic import L
from fastapi import FastAPI, Response, Depends, HTTPException, status, Cookie


def createAccessToken(userName:str,role:UserRole):
    payload = {
        "sub":userName,
        "role":role.value
    }

    return jwt.encode(payload=payload,key=settings.SECRET_KEY,algorithm=[settings.ALGORITHM])


def getCurrentUserFromCookie(accessToken:str | None = Cookie(default=None)):
    if not accessToken:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not Authenticated Pleas log in"
        )

    try:
        payload = jwt.decode(accessToken, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return {
            "username": payload.get("sub"),
            "role": payload.get("role")
        }
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token.")
    

def requiredRole(allowedRole:list[str]):
    def roleChecker(user: dict = Depends(getCurrentUserFromCookie)):
        if user["role"] not in allowedRole:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not Enough Permission"
            )

        return user
    return roleChecker