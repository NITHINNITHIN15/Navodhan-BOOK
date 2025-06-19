from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth.routes import auth_router
from books.routes import book_router

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      
    allow_credentials=True,
    allow_methods=["*"],            
    allow_headers=["*"],              
)

app.include_router(auth_router, prefix="/auth")
app.include_router(book_router)
