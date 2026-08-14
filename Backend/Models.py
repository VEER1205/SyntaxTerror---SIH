from pydantic import BaseModel,EmailStr
from enum import Enum

class UserRole(Enum):
    student = "student"
    institut = "institut"
    AicteOfficer = "AicteOfficer"


class User(BaseModel):
    email: EmailStr
    name: str
    hashedPassword: str
    role:UserRole

# Request Classes 
class LoginRequest(BaseModel):
    userName: str
    password: str