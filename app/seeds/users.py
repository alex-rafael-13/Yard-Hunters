from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='MrDemo',
        first_name= 'Demo',
        last_name='User',
        email='demo@aa.io',
        bio='Just a demo user testing if this works',
        password='password'
    )
    marnie = User(
        username='MsMarnie',
        first_name='Marnie',
        last_name= 'Johnson', 
        email='marnie@aa.io',
        bio='My name is Marnie, I am also a test for functionality', 
        password='password'
    )
    bobbie = User(
        username='RobotBobbie',
        first_name='Bobbie',
        last_name='Clank', 
        email='bobbie@aa.io',
        bio='I promise you I am not an AI ready to destroy humanity', 
        password='password'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()