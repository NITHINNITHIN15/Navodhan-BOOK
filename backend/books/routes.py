from fastapi import APIRouter, Depends, HTTPException, status
from auth.utils import decode_token
from fastapi.security import OAuth2PasswordBearer
from books.schemas import BookCreate, BookUpdate
from database import database

from bson import ObjectId

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
book_router = APIRouter()

books_collection = database.get_collection("books")

def get_user_email(token: str = Depends(oauth2_scheme)):
    return decode_token(token)["sub"]

@book_router.post("/books")
async def add_book(book: BookCreate, email: str = Depends(get_user_email)):
    book_dict = book.dict()
    book_dict["owner"] = email
    result = await books_collection.insert_one(book_dict)
    return {"id": str(result.inserted_id)}

@book_router.get("/books")
async def get_books(email: str = Depends(get_user_email)):
    books = await books_collection.find({"owner": email}).to_list(length=100)
    for book in books:
        book["id"] = str(book["_id"])
        del book["_id"]
    return books

@book_router.put("/books/{book_id}")
async def update_book(book_id: str, book: BookUpdate, email: str = Depends(get_user_email)):
    existing = await books_collection.find_one({"_id": ObjectId(book_id), "owner": email})
    if not existing:
        raise HTTPException(status_code=404, detail="Book not found")
    await books_collection.update_one({"_id": ObjectId(book_id)}, {"$set": book.dict()})
    return {"msg": "Book updated"}

@book_router.delete("/books/{book_id}")
async def delete_book(book_id: str, email: str = Depends(get_user_email)):
    result = await books_collection.delete_one({"_id": ObjectId(book_id), "owner": email})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Book not found or unauthorized")
    return {"msg": "Book deleted"}
