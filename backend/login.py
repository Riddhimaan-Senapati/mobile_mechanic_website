from fastapi import FastAPI
from sqlalchemy import create_engine, text
import os
from pydantic import BaseModel


DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

url = "postgresql://postgres.lperpdujkzvsotsthwtd:MobileMechanic@123@aws-1-us-east-2.pooler.supabase.com:6543/postgres"

engine = create_engine(url, connect_args={"sslmode": "require"})

app = FastAPI()

class newUser(BaseModel):
    username: str
    firstn: str
    lastn: str
    email: str
    number: str
    password: str

@app.post("/new user/")
def create_user(user: newUser):
    query = text(""" INSERT INTO users (username, firstn, lastn, email, number, password)
                 VALUES (:username, :firstn, :lastn, :email, :number, :password)""")

    with engine.begin() as conn:
        conn.execute(query, {
            "username":user.username,
            "first name":user.firstn,
            "last name":user.lastn,
            "email":user.email,
            "mobile number":user.number,
            "password":user.password
        })

    return {"message":"New user added!", "username":user.username}


