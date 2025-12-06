from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(dotenv_path=Path(__file__).parent / ".env")

DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")


DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

app = FastAPI()

engine = create_engine(DATABASE_URL, connect_args={"sslmode": "require"})

@app.post("/send-message")
def send_message(sender_id: str, receiver_id: str, msg: str):
    query = text(""" INSERT INTO messages (sender_id, receiver_id, msg)
                 VALUES (:sender_id, :receiver_id, :msg)
                 RETURNING id, created_at; """)
    try:
        with engine.begin() as conn:
            result = conn.execute(query, {
                "sender_id" : sender_id,
                "receiver_id" : receiver_id,
                "msg": msg 
            })
            cell = result.mappings().first()
        return {"message": "sent", "id": cell["id"], "created_at": cell["created_at"]}
    except Exception as e:
        raise HTTPException(status_code=400, detail = f"Error sending message: {str(e)}")


@app.get("/get-conversation")
def get_convo(user1: str, user2: str):
    query = text(""" SELECT * FROM messages  WHERE (sender_id = :user1 AND receiver_id = :user2)  
                 OR (sender_id = :user2 AND receiver_id = :user1) """)
    try:
        with engine.begin() as conn:
            result = conn.execute(query, {"user1":user1, "user2": user2})
            messages = [dict(row._mapping) for row in result]
        return {"conversation":messages}
    except Exception as e:
        raise HTTPException(status_code=400, detail = f"Error getting conversation: {str(e)}")
