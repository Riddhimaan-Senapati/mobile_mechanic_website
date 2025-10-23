from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine, text
from pydantic import BaseModel, EmailStr, HttpUrl
from dotenv import load_dotenv
import os
from pathlib import Path
from datetime import datetime

load_dotenv(dotenv_path=Path(__file__).parent / ".env")

DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")


DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL, connect_args={"sslmode": "require"})


app = FastAPI()

class Booking(BaseModel):
    email: EmailStr
    make: str
    model: str
    year: str | None = None
    address: str
    description: str
    datetime: datetime

class BookingImg(BaseModel):
    booking_id: str
    image_url: HttpUrl

@app.post("/add-new-booking")
def new_booking(booking: Booking):
    query = text(""" INSERT INTO "BookingInfo" (email, make, model, year, address, description, datetime)
                 VALUES (:email, :make, :model, :year, :address, :description, :datetime) 
                 RETURNING id; """)
    try:
        with engine.begin() as conn:
            res = conn.execute(query, booking.model_dump())
            booking_id = res.scalar()
        return{"message":"New booking added!"}
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error adding booking: {str(e)}")

@app.delete("/delete-booking")
def delete_booking(email: EmailStr, date_time: datetime):
    query = text(""" DELETE from "BookingInfo" WHERE email = :email AND datetime = :datetime
                 RETURNING id; """)
    try:
        with engine.begin() as conn:
            res = conn.execute(query, {"email": email, "datetime": date_time})
            del_id = res.scalar()
            if not del_id:
                raise HTTPException(status_code=404, detail="No booking found")
        return {"message": "Booking deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail = f"Error deleting booking: {str(e)}")
    
@app.post("/add-booking-image")
def add_image(img: BookingImg):
    query = text(""" INSERT INTO booking_images (booking_id, image_url)
                 VALUES (:booking_id, :image_url)
                 RETURNING id, uploaded_at; """)
    try:
        with engine.begin() as conn:
            res = conn.execute(query, img.model_dump())
            new_img = res.mappings().first()
            return {"message": "Image added successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail = f"Error adding image: {str(e)}")


    
