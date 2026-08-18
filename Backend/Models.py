from pydantic import BaseModel,EmailStr
from enum import Enum

class UserRole(Enum):
    student = "student"
    institut = "institut"
    AicteOfficer = "AicteOfficer"


# Request Classes 
class LoginRequest(BaseModel):
    identifier: str
    password: str

class SignupRequest(BaseModel):
    email: EmailStr
    userName: str
    password: str  # fixed: was 'Password' (capital P)
    role: UserRole