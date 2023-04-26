from app.models import db, Product_Condition, environment, SCHEMA
from sqlalchemy.sql import text

def seed_conditions():
    new = Product_Condition(
        condition = 'New'
    )
    like_new = Product_Condition(
        condition = 'Used - Like New'
    )
    good = Product_Condition(
        condition = 'Used - Good'
    )
    fair = Product_Condition(
        condition = 'Used - Fair'
    )

    lst = [new, like_new, good, fair]
    for condition in lst:
        db.session.add(condition)
    db.session.commit()

def undo_conditions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_conditions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_conditions"))
        
    db.session.commit()
