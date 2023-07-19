from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    drill = Product(
        name = 'Milwakee Drill',
        price = 130,
        condition_id = 3,
        owner_id = 1,
        event_id = 1,
        category_id = 3,
        description = 'Used a couple of times, still great condition. Works well just don\'t have a use for it'
    )
    lightsaber = Product(
        name = 'Light Saber',
        price = 40,
        condition_id = 3,
        owner_id = 1,
        event_id = 1,
        category_id = 4,
        description = 'Kids did not want them anymore, used but in great condition!'
    )
    shoes = Product(
        name = 'Jordan\'s',
        price = 240,
        condition_id = 2,
        owner_id = 1,
        event_id = 1,
        category_id = 1,
        description = 'Used a couple of times, no creases and well kept'
    )
    chair = Product(
        name = 'Patio Chairs',
        price = 40,
        condition_id = 2,
        owner_id = 1,
        event_id = 1,
        category_id = 7,
        description = 'Getting new chairs, price negotionable'
    )
    tacos = Product(
        name = 'Tacos',
        price = 2.50,
        condition_id = 1,
        owner_id = 3,
        event_id = 3,
        category_id = 8,
        description = 'Tacos: Asada, Chicken, Barbacoa, Birria, Al Pastor, Vej. Fajitas'
    )
    burritos = Product(
        name = 'Burritos',
        price = 10,
        condition_id = 1,
        owner_id = 3,
        event_id = 3,
        category_id = 8,
        description = 'Burritos: Asada, Chicken, Barbacoa, Birria, Al Pastor, Vej. Fajitas'
    )
    mulitas = Product(
        name = 'Mulitas',
        price = 5,
        condition_id = 1,
        owner_id = 3,
        event_id = 3,
        category_id = 8,
        description = 'Mulitas: Asada, Chicken, Barbacoa, Birria, Al Pastor, Vej. Fajitas'
    )
    quesadillas = Product(
        name = 'Quesadillas',
        price = 5,
        condition_id = 1,
        owner_id = 3,
        event_id = 3,
        category_id = 8,
        description = 'Quesadillas: Asada, Chicken, Barbacoa, Birria, Al Pastor, Vej. Fajitas'
    )
    tortas = Product(
        name = 'Tortas',
        price = 5,
        condition_id = 1,
        owner_id = 3,
        event_id = 3,
        category_id = 8,
        description = 'Tortas: Asada, Chicken, Barbacoa, Birria, Al Pastor, Vej. Fajitas'
    )
    aguas = Product(
        name = 'Aguas Frescas',
        price = 12,
        condition_id = 1,
        owner_id = 3,
        event_id = 3,
        category_id = 8,
        description = 'Flavors: Horchata, Jamaica, Sandia, Pepino'
    )

    ps = Product(
        name = 'PlayStation 5',
        price = 700,
        condition_id = 1,
        owner_id = 2,
        category_id = 6,
        description = 'Brand new, selling just because I want to invest in a PC'
    )
    lego = Product(
        name = 'Box of Legos',
        price = 50,
        condition_id = 4,
        owner_id = 1,
        event_id = 1,
        category_id = 4,
        description = 'Box filled with random Legos my kids collected over the years'
    )
    pokemon_card = Product(
        name = 'First Gen Pikachu Card',
        price = 450,
        condition_id = 2,
        owner_id = 1,
        event_id = 1,
        category_id = 5,
        description = 'Well kept and PSA graded 9.5 card, looking to sell at set price or trade for something else'
    )
    
    lst = [drill, ps, lego, pokemon_card, chair, lightsaber, shoes, tacos, burritos, mulitas, quesadillas, tortas, aguas]
    for product in lst:
        db.session.add(product)
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()