from app.models import db, Event, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, time

def seed_events():
    event1 = Event(
        name = 'Event 1',
        description ='This event is for testing purposes only',
        host_id = 1,
        event_type_id = 1,
        address = '123 Random Address',
        city='Seattle',
        state='Washington',
        country='United States',
        date= datetime.today(),
        start_time= time(12,30),
        end_time= time(14, 30)
    )
    event2 = Event(
        name = 'Event 2',
        description ='This event is for testing purposes only',
        host_id = 2,
        event_type_id = 2,
        address = '123 Random Address',
        city='San Francisco',
        state='California',
        country='United States',
        date= datetime.today(),
        start_time= time(12,30),
        end_time= time(14, 30)
    )
    event3 = Event(
        name = 'Event 3',
        description ='This event is for testing purposes only',
        host_id = 3,
        event_type_id = 3,
        address = '123 Random Address',
        city='New York',
        state='New York',
        country='United States',
        date= datetime.today(),
        start_time= time(12,30),
        end_time= time(14, 30)
    )
    db.session.add(event1)
    db.session.add(event2)
    db.session.add(event3)
    db.session.commit()

def undo_events():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.events RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM events"))
        
    db.session.commit()
