from app.models import db, Event, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, time, timedelta

def seed_events():
    yard_sale = Event(
        name = 'Spring Cleaning Yard Sale',
        description ="""Hey everyone! I'm excited to announce that I'm having a yard sale this weekend as part of my spring cleaning efforts. I've been going through my closets, basement, and garage, and I've found all sorts of items that I no longer need or use. From clothes and shoes to kitchen gadgets and home decor, there's a little bit of everything.
            I'm really looking forward to this yard sale because not only will it help me declutter my home and make some extra cash, but it's also a great way to connect with my community and promote sustainability. Instead of throwing these items away, I'd much rather see them go to someone who will use and appreciate them.
            So if you're in the neighborhood, come by and say hi! You might just find something you can't live without. And if you're not able to make it, feel free to spread the word to friends and family who might be interested. Thanks, and hope to see you there!""",
        host_id = 1,
        event_type_id = 1,
        address = '123 Random Address',
        city='Seattle',
        state='Washington',
        country='United States',
        date= datetime.today() + timedelta(1),
        start_time= time(12,30),
        end_time= time(14, 30),
        image_url = 'https://www.gannett-cdn.com/presto/2022/08/12/NDRP/cf37518c-3889-4d53-abd8-2c26c8a447c4-US-12_Garage_sale_Coldwater_2.JPG'
    )
    fundraiser = Event(
        name = 'Summer Fun Fundraiser!',
        description ="""Summer camps can be a life-changing experience for kids, but unfortunately, not all families can afford to send their children to these programs. That's why we're hosting a fundraiser to help make summer camp accessible to as many kids as possible!
            Our fundraiser involves selling delicious ice cream treats, with all proceeds going towards sponsoring kids to attend summer camps. We have a wide variety of flavors and toppings to choose from, so whether you're in the mood for something classic like chocolate or something more adventurous like lavender honey, we've got you covered.
            Not only will you be satisfying your sweet tooth, but you'll also be helping to provide a fun and enriching experience for local kids. Summer camp is a great way for kids to make new friends, learn new skills, and build confidence and independence.
            So come on out and support our fundraiser! We'll be set up at the park every Saturday from 1pm to 4pm, and we'd love to see you there. Let's work together to make sure every child has the opportunity to experience the joys of summer camp!""",
        host_id = 2,
        event_type_id = 3,
        address = '123 Random Address',
        city='San Francisco',
        state='California',
        country='United States',
        date= datetime.today(),
        start_time= time(12,30),
        end_time= time(14, 30),
        image_url = 'https://edit.org/img/blog/q8r-donation-flyer-template-editable-free.jpg'
    )
    food_stand = Event(
        name = 'Tacos Los Deliciosos',
        description ="""
            Hey there!  
            If you're a fan of delicious tacos, I'd like to invite you to join me at my taco truck, Los Deliciosos! We're serving up some of the most mouth-watering tacos in town, made with fresh, locally-sourced ingredients and authentic recipes.
            Whether you're a carnivore, vegetarian, or vegan, we've got plenty of options to satisfy your cravings. From our juicy carne asada to our spicy tofu, each taco is packed with flavor and served with a smile.
            So if you're looking for a quick and tasty lunch or dinner, come check us out! See you there!""",
        host_id = 3,
        event_type_id = 2,
        address = '123 Random Address',
        city='New York',
        state='New York',
        country='United States',
        date= datetime.today(),
        start_time= time(12,30),
        end_time= time(14, 30),
        image_url = 'https://static.vecteezy.com/system/resources/previews/000/098/626/original/vector-taco-truck.jpg'
    )
    block_party = Event(
        name = 'Summer Bash Party!',
        description ="""            
            Summer is here, and what better way to celebrate than with a block party! Our neighborhood is hosting a summer bash that's perfect for families and friends of all ages.
            We're closing down the street and transforming it into a lively gathering space, complete with music, games, food, and more. From bounce houses and face painting to cornhole and giant Jenga, there will be plenty of activities to keep everyone entertained.
            Of course, no block party is complete without food! We'll have food trucks and vendors offering a wide variety of delicious treats, from hot dogs and burgers to ice cream and cotton candy. There will also be non-alcoholic drinks available for all ages.
            This summer bash is the perfect opportunity to meet and connect with your neighbors, while enjoying the beautiful weather and creating lasting memories with your loved ones. So mark your calendars and join us on July 24th from 12pm to 6pm for a day of fun and community!""",
        host_id = 3,
        event_type_id = 4,
        address = '123 Random Address',
        city='New York',
        state='New York',
        country='United States',
        date= datetime(2023, 6, 24),
        start_time= time(12,30),
        end_time= time(14, 30),
        image_url = 'https://exposureevents.com/assets/files/jpg/186417?v=26048791'
    )
    community_event = Event(
        name = 'App Academy Graduation!',
        description ="""
            I am thrilled to invite you to our graduation ceremony! We've worked incredibly hard over the past 6+ months, and we're excited to celebrate our achievements with our family, friends, and fellow coders.
            We'll be honoring all of our graduates with speeches, awards, and certificates, as well as showcasing some of the amazing projects we've been working on during the program.
            It's not just an end, but also the beginning of an exciting new chapter in our lives as developers.
            Thank you for your continued support, and I hope to see you at the graduation!""",
        host_id = 3,
        event_type_id = 5,
        address = '123 Random Address',
        city='New York',
        state='New York',
        country='United States',
        date= datetime.today(),
        start_time= time(13,30),
        end_time= time(15, 30),
        image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD7LQN_IZBrdj0blkPd4bUbarpDHBfocEV8A&usqp=CAU'
    )

    db.session.add(yard_sale)
    db.session.add(food_stand)
    db.session.add(fundraiser)
    db.session.add(block_party)
    db.session.add(community_event)
    db.session.commit()

def undo_events():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.events RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM events"))
        
    db.session.commit()
