from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text

def seed_categories():
    clothing = Category(
        category = 'Clothing'
    ) 
    kitchenware = Category(
        category = 'Kitchenware'
    ) 
    tools = Category(
        category = 'Tools'
    ) 
    toys = Category(
        category = 'Toys'
    ) 
    collectables = Category(
        category = 'Collectables'
    ) 
    electronics = Category(
        category = 'Electronics'
    ) 
    
    lst = [clothing, kitchenware, tools, toys, collectables, electronics]
    for category in lst:
        db.session.add(category)
    db.session.commit()


def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))
        
    db.session.commit()
