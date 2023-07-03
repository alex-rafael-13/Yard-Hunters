from app.models import db, environment, Event_Comment, SCHEMA
from sqlalchemy.sql import text

def seed_event_comments():
    comment_1 = Event_Comment(
        event_id = 1,
        user_id = 2,
        comment_body = 'Test Comment 1'
    )
    comment_2 = Event_Comment(
        event_id = 2,
        user_id = 1,
        comment_body = 'Test Comment 2'
    )
    comment_3 = Event_Comment(
        event_id = 3,
        user_id = 1,
        comment_body = 'Test Comment 3'
    )

    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)
    db.session.commit()

def undo_event_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.event_comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM event_comments"))
        
    db.session.commit()