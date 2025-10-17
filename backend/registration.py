from fastapi import FastAPI
from sqlalchemy import create_engine, text
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from pathlib import Path

load_dotenv(dotenv_path=Path(__file__).parent / ".env")

DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")


DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL, connect_args={"sslmode": "require"})


app = FastAPI()


class newUser(BaseModel):
    firstn: str
    lastn: str
    email: str
    number: str
    password: str
    confirmPassword: str


@app.post("/new user/")
def create_user(user: newUser):
    query = text(""" INSERT INTO users (firstn, lastn, email, number, password, "confirmPassword")
                 VALUES (:firstn, :lastn, :email, :number, :password, :confirmPassword)""")

    with engine.begin() as conn:
        conn.execute(
            query,
            {
                "firstn": user.firstn,
                "lastn": user.lastn,
                "email": user.email,
                "number": user.number,
                "password": user.password,
                "confirmPassword": user.confirmPassword,
            },
        )

    return {"message": "New user added!", "username": user.firstn}
