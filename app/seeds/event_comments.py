from app.models import db, environment, Event_Comment, SCHEMA
from sqlalchemy.sql import text

def seed_event_comments():
    comments = [
        Event_Comment(
            event_id = 1,
            user_id = 2,
            comment_body = 'Can\'t wait! I love yard sales!'
        ),
        Event_Comment(
            event_id = 1,
            user_id = 3,
            comment_body = 'Will you have another one soon? I unfortunately can\'t go this time :('
        ),
        Event_Comment(
            event_id = 2,
            user_id = 1,
            comment_body = 'Please come support, this is such a great program for the kids!'
        ),
        Event_Comment(
            event_id = 2,
            user_id = 3,
            comment_body = 'Yummy ice cream! Count me in!'
        ),
        Event_Comment(
            event_id = 3,
            user_id = 2,
            comment_body = 'Their asada tacos are to die for! Highly recommend!'
        ),
        Event_Comment(
            event_id = 3,
            user_id = 1,
            comment_body = 'I wish I wasn\'t on a diet at the moment :('
        ),
        Event_Comment(
            event_id = 4,
            user_id = 1,
            comment_body = 'Love my community, my family always has a blast at this event!'
        ),
        Event_Comment(
            event_id = 5,
            user_id = 1,
            comment_body = 'Congrats grads!!! You did it!!!'
        ),
    ]
    for comment in comments:
        db.session.add(comment)

    db.session.commit()

def undo_event_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.event_comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM event_comments"))
        
    db.session.commit()