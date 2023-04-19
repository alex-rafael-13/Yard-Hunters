from app.models import db, Event_Type, environment, SCHEMA
from sqlalchemy.sql import text

def seed_event_types():
    yard_sale = Event_Type(
        type = 'Yard Sale'
    )
    food = Event_Type(
        type = 'Food Stand'
    )
    fundraiser = Event_Type(
        type = 'Fundraiser'
    )
    block_party =  Event_Type(
        type = 'Block Party'
    )
    community = Event_Type(
        type = 'Community Event'
    )

    db.session.add(yard_sale)
    db.session.add(food)
    db.session.add(fundraiser)
    db.session.add(block_party)
    db.session.add(community)
    db.session.commit()

def undo_event_types():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.event_types RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM event_types"))
        
    db.session.commit()