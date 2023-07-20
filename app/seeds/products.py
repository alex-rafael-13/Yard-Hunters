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
        price = 7,
        condition_id = 1,
        owner_id = 3,
        event_id = 3,
        category_id = 8,
        description = 'Quesadillas: Asada, Chicken, Barbacoa, Birria, Al Pastor, Vej. Fajitas'
    )
    tortas = Product(
        name = 'Tortas',
        price = 10,
        condition_id = 1,
        owner_id = 3,
        event_id = 3,
        category_id = 8,
        description = 'Tortas: Asada, Chicken, Barbacoa, Birria, Al Pastor, Vej. Fajitas'
    )
    aguas = Product(
        name = 'Aguas Frescas',
        price = 2,
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
    ice_cream = Product(
        name='Ice Cream',
        price=3,
        condition_id=1,
        owner_id=2,
        event_id=2,
        category_id = 8,
        description = 'Vanilla, chocolate, cookies and cream, strawberry swirl, etc.'
    )
    paletas = Product(
        name='Paletas',
        price=1.50,
        condition_id=1,
        owner_id=2,
        event_id=2,
        category_id = 8,
        description = 'Variety of Mexican paletas will be available!'
    )
    banana_split = Product(
        name='Banana Split',
        price=5,
        condition_id=1,
        owner_id=2,
        event_id=2,
        category_id = 8,
        description = 'Your classic banana split!'
    )
    sundae = Product(
        name='Ice Cream Sundae',
        price=4,
        condition_id=1,
        owner_id=2,
        event_id=2,
        category_id = 8,
        description = 'Your classic ice cream sundae!'
    )
    electrician = Product(
        name = 'Walter\'s  Electrics',
        price = 1,
        condition_id = 1,
        owner_id = 1,
        category_id = 9,
        description = 'Need electrical work done? Call us at (888)888-8888'
    )
    pans = Product(
        name = 'Brand New Pots',
        price = 150,
        condition_id = 2,
        owner_id = 3,
        category_id = 2,
        description = 'Used some but most of the set was kept in the box'
    )
    art = Product(
        name = 'Custom Art!',
        price = 35,
        condition_id = 1,
        owner_id = 2,
        category_id = 9,
        description = 'Need a special gift for a special someone? Send me email an to art@aa.io to connect about ideas!'
    )
    skateboard = Product(
        name = 'Skateboard!',
        price = 70,
        condition_id = 1,
        owner_id = 3,
        category_id = 3,
        description = 'Also willing to trade for another skateboard/ anything else that you have to offer!'
    )
    katana = Product(
        name = 'Katanas',
        price = 120,
        condition_id = 1,
        owner_id = 1,
        category_id = 5,
        description = 'Imported from Japan. Great condition they\'ve been a decoration piece for my room but I am moving and don\t have the space for them anymore'
    )
    jersey = Product(
        name = 'Real Madrid Jersey 03/04',
        price = 150,
        condition_id = 2,
        owner_id = 3,
        category_id = 1,
        description = 'Vintage Beckham jersey from his time in Los Blancos'
    )
    couch = Product(
        name = 'Leather Couch',
        price = 45,
        condition_id = 3,
        owner_id = 1,
        category_id = 7,
        description = 'Getting a new couch, it has been used for a couple of years but still very sturdy and clean'
    )
    ladder = Product(
        name = 'Ladder',
        price = 55,
        condition_id = 4,
        owner_id = 2,
        category_id = 3,
        description = 'Used it at my old job but changed careers so I won\'t be needing it anymore'
    )
    shuffle = Product(
        name = 'Ipod Shuffle',
        price = 75,
        condition_id = 3,
        owner_id = 3,
        category_id = 6,
        description = 'Used it everyday as a teenager, still very clean plus factory resetted'
    )


    
    lst = [drill, ps, lego, pokemon_card, chair, lightsaber, shoes, tacos, burritos, mulitas, quesadillas, tortas, aguas, ice_cream, paletas, banana_split, sundae, electrician, pans, art, skateboard, katana, jersey, couch, ladder, shuffle]
    for product in lst:
        db.session.add(product)
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()