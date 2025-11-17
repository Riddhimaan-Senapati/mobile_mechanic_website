from fastapi.testclient import TestClient
import pytest
from datetime import datetime
from bookings import app, engine
from sqlalchemy import text
from datetime import datetime

client = TestClient(app)

@pytest.fixture(autouse=True)
def cleanup_table():
    with engine.begin() as conn:
        conn.execute(text('DELETE FROM "Test_User";'))
    yield
    with engine.begin() as conn:
        conn.execute(text('DELETE FROM "Test_User";'))

def test_new_booking_success():
    data = {
        "email": "testuser3@example.com",
        "make": "Honda",
        "model": "string",
        "year": "2025",
        "address": "Amherst, Ma",
        "description": "This is a test booking",
        "datetime": datetime.now().isoformat()
    }

    response = client.post("/add-new-booking?test=true", json=data)

    assert response.status_code == 200
    result = response.json()
    assert "message" in result
    assert result["message"] == "New booking added into \"Test_User\""

def test_new_booking_missingfield():
    data = {
        "email": "testuser3@example.com",
        "model": "string",
        "year": "2025",
        "address": "Amherst, Ma",
        "description": "This is a test booking",
        "datetime": datetime.now().isoformat()
    }
    response = client.post("/add-new-booking?test=true", json=data)
    assert response.status_code == 422

def test_new_booking_invalidEmail():
    data = {
        "email": "notEmail",
        "make": "Honda",
        "model": "string",
        "year": "2025",
        "address": "Amherst, Ma",
        "description": "This is a test booking",
        "datetime": datetime.now().isoformat()
    }
    response = client.post("/add-new-booking?test=true", json=data)
    assert response.status_code == 422

def test_delete_booking_success():
    data = {
        "email": "delete_test@example.com",
        "make": "Honda",
        "model": "string",
        "year": "2016",
        "address": "Road 123",
        "description": "Delete test",
        "datetime": "2025-11-06T15:00:00"
    }
    client.post("/add-new-booking?test=true", json=data)
    response = client.delete(
        "/delete-booking",
        params={"email": "delete_test@example.com", "date_time": "2025-11-06T15:00:00", "test": "true"},
    )

    assert response.status_code == 200
    assert response.json()["message"] == "Booking deleted successfully from \"Test_User\""

def test_delete_booking_not_found():
    response = client.delete(
        "/delete-booking",
        params={"email": "none-exist@example.com", "date_time": "2025-11-07T15:00:00", "test": "true"},
    )
    assert response.status_code == 404
    assert response.json()["detail"] == "No booking found"

def test_delete_booking_invalid_email():
    response = client.delete(
        "/delete-booking",
        params={"email": "not-an-email", "date_time": "2025-11-08T15:00:00", "test": "true"},
    )
    assert response.status_code == 422 


def test_get_all_bookings_success():
    with engine.begin() as conn:
        conn.execute(text('DELETE FROM "Test_User";'))
        conn.execute(text("""
            INSERT INTO "Test_User" (email, make, model, year, address, description, datetime)
            VALUES 
            ('test1@example.com', 'Honda', 'string', '2015', '123 Main St', 'Oil change', '2025-11-06T15:00:00'),
            ('test2@example.com', 'Mazda', 'string', '2016', '456 Side St', 'Brake service', '2025-11-07T15:00:00');
        """))

    response = client.get("/get-bookings?test=true")
    assert response.status_code == 200
    data = response.json()
    assert "Bookings" in data
    assert isinstance(data["Bookings"], list)
    assert len(data["Bookings"]) == 2
    assert data["Bookings"][0]["email"] == "test2@example.com"

def test_get_all_bookings_empty():
    with engine.begin() as conn:
        conn.execute(text('DELETE FROM "Test_User";'))

    response = client.get("/get-bookings?test=true")
    assert response.status_code == 200
    data = response.json()
    assert data["Bookings"] == []


def test_edit_booking_success():
    with engine.begin() as conn:
        conn.execute(text("""
            INSERT INTO "Test_User" (email, make, model, year, address, description, datetime)
            VALUES ('editme@example.com', 'Toyota', 'string', '2020', 'address', 'Tire change', '2025-11-07T12:00:00')
        """))
        result = conn.execute(text('SELECT id FROM "Test_User" WHERE email = :email'), {"email": "editme@example.com"})
        booking_id = result.scalar()

    payload = {
        "id": str(booking_id),
        "make": "Honda",
        "model": "Civic"
    }

    response = client.put("/edit-booking?test=true", json=payload)
    assert response.status_code == 200
    assert response.json()["message"] == "Booking updated successfully"

    with engine.begin() as conn:
        row = conn.execute(text('SELECT make, model FROM "Test_User" WHERE id = :id'), {"id": booking_id}).mappings().first()
        assert row["make"] == "Honda"
        assert row["model"] == "Civic"

def test_edit_booking_no_fields():
    with engine.begin() as conn:
        conn.execute(text("""
            INSERT INTO "Test_User" (email, make, model, year, address, description, datetime)
            VALUES ('nofields@example.com', 'Mazda', 'string', '2020', 'address', '', '2025-11-07T15:00:00')
        """))
        result = conn.execute(text('SELECT id FROM "Test_User" WHERE email = :email'), {"email": "nofields@example.com"})
        booking_id = result.scalar()

    payload = {"id": str(booking_id)}

    response = client.put("/edit-booking?test=true", json=payload)
    assert response.status_code == 400
    assert response.json()["detail"] == "No fields provided for update"

def test_edit_booking_not_found():
    payload = {
        "id": "00000000-0000-0000-0000-000000000000",
        "make": "Honda"
    }
    response = client.put("/edit-booking?test=true", json=payload)
    assert response.status_code == 404
    assert response.json()["detail"] == "Booking not found"

