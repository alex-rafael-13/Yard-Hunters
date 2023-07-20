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
    furniture = Category(
        category = 'Furniture'
    )
    food = Category(
        category = 'Food'
    )
    service = Category(
        category = 'Services'
    ) 
    
    lst = [clothing, kitchenware, tools, toys, collectables, electronics, furniture, food, service]
    for category in lst:
        db.session.add(category)
    db.session.commit()


def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))
        
    db.session.commit()
