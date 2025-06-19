from fastapi import APIRouter, HTTPException
from .schemas import UserRegister, UserLogin
from .utils import hash_password, verify_password, create_access_token
from database import user_collection

auth_router = APIRouter()

@auth_router.post("/register")
async def register(user: UserRegister):
    existing_user = await user_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    user_dict = user.dict()
    user_dict["password"] = hash_password(user.password)
    await user_collection.insert_one(user_dict)
    return {"msg": "User registered successfully"}

@auth_router.post("/login")
async def login(user: UserLogin):
    db_user = await user_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": db_user["email"],"username": db_user["username"]})
    return {"access_token": token, "token_type": "bearer"}
