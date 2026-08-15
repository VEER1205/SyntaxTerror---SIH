from pydantic import BaseModel,EmailStr
from enum import Enum

class UserRole(Enum):
    student = "student"
    institut = "institut"
    AicteOfficer = "AicteOfficer"


# Request Classes 
class LoginRequest(BaseModel):
    userName: str
    password: str

class SignupRequest(BaseModel):
    email: EmailStr
    userName: str
    Password: str
    role:UserRole