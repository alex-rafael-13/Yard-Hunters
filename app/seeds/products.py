from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    drill = Product(
        name = 'Milwakee Drill',
        price = 130.90,
        condition_id = 3,
        owner_id = 1,
        event_id = 1,
        category_id = 3,
        description = 'Used a couple of times, still great condition. Works well just don\'t have a use for it'
    )

    db.session.add(drill)
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()