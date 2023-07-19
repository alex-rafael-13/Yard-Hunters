from app.models import db, Event_Image, environment, SCHEMA
from sqlalchemy import text

def seed_event_images():
    yard_sale = Event_Image(
        event_id = 1,
        image_url = 'http://yard-hunters.s3.amazonaws.com/f4ca42338fde4018b126976a97d915e6.jpg',
        preview = True
    )
    fundraiser = Event_Image(
        event_id = 2,
        image_url = 'http://yard-hunters.s3.amazonaws.com/347122eb4bcd4ad8a77e5d09132e0844.jpg',
        preview = True
    )
    food_stand = Event_Image(
        event_id = 3,
        image_url = 'http://yard-hunters.s3.amazonaws.com/14f380d95a024b179a27f853c2a2745d.jpg',
        preview = True
    )
    block_party = Event_Image(
        event_id = 4,
        image_url = 'http://yard-hunters.s3.amazonaws.com/b15f2b34eb2a456ab618a7a9592d100b.jpeg',
        preview = True
    )
    community_event = Event_Image(
        event_id = 5,
        image_url = 'http://yard-hunters.s3.amazonaws.com/db7862f7e87c46509aac7abd9f3259f8.png',
        preview = True
    )

    db.session.add(yard_sale)
    db.session.add(food_stand)
    db.session.add(fundraiser)
    db.session.add(block_party)
    db.session.add(community_event)
    db.session.commit()

def undo_event_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.event_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM event_images"))
        
    db.session.commit()