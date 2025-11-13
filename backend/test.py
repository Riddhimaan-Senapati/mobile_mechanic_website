from sqlalchemy import create_engine

DATABASE_URL = "postgresql://postgres:MobileMechanic123@db.lperpdujkzvsotsthwtd.supabase.co:5432/postgres"
engine = create_engine(DATABASE_URL, connect_args={"sslmode": "require"})

with engine.begin() as conn:
    print(conn.execute("SELECT 1").scalar())