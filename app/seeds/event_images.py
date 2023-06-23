from app.models import db, Event_Image, environment, SCHEMA
from sqlalchemy import text

def seed_event_images():
    yard_sale = Event_Image(
        event_id = 1,
        image_url = 'https://www.gannett-cdn.com/presto/2022/08/12/NDRP/cf37518c-3889-4d53-abd8-2c26c8a447c4-US-12_Garage_sale_Coldwater_2.JPG',
        preview = True
    )
    fundraiser = Event_Image(
        event_id = 2,
        image_url = 'https://edit.org/img/blog/q8r-donation-flyer-template-editable-free.jpg',
        preview = True
    )
    food_stand = Event_Image(
        event_id = 3,
        image_url = 'https://edit.org/img/blog/q8r-donation-flyer-template-editable-free.jpg',
        preview = True
    )
    block_party = Event_Image(
        event_id = 4,
        image_url = 'https://exposureevents.com/assets/files/jpg/186417?v=26048791',
        preview = True
    )
    community_event = Event_Image(
        event_id = 5,
        image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD7LQN_IZBrdj0blkPd4bUbarpDHBfocEV8A&usqp=CAU',
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