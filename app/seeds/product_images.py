from app.models import db, Product_Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_product_images():
    drill_images = [
        Product_Image(
            product_id = 1,
            image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK8iWm-QRfNNtBXdWAs46l8JUIWnOgPHAq3w&usqp=CAU',
            preview = True
        ),
        Product_Image(
            product_id = 1,
            image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTswAZmagI-lfjzZUUWTEhupTAff_EKCDn3-w&usqp=CAU'
        ),
    ]
    for drill in drill_images:
        db.session.add(drill)

    ps_images = [
        Product_Image(
            product_id = 2,
            image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzjDsTIMCgAbFl1LirQWA_ZlJSLc2wC0eRc4nl__mo4ZtR7udJ6jyIV6UNNytLii6ZyQw&usqp=CAU',
            preview = True
        ),
        Product_Image(
            product_id = 2,
            image_url = 'https://blog.playstation.com/tachyon/2022/10/c11392b827562bb1d6560838cad4288f208f13db.jpeg?resize=1088%2C612&crop_strategy=smart'
        ),
        Product_Image(
            product_id = 2,
            image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-4DTZ4D7QmQ_Bccer3wAuyF-uVfy2hcA2XQ&usqp=CAU'
        ),
    ]
    for ps in ps_images:
        db.session.add(ps)
    
    lego_images = [
        Product_Image(
            product_id = 3,
            image_url = 'https://media.wired.com/photos/5d9b9f2034cab0000861c50a/master/w_2560%2Cc_limit/Gear-Lego-Recycling.jpg',
            preview = True
        ),
        Product_Image(
            product_id = 3,
            image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeAyQpheWurFvZMg9FuEJeqDjL342ENB-2xBhEWvsVhOVPIIiwUM0hT0LXB42A7nTV-Wk&usqp=CAU'
        ),
        Product_Image(
            product_id = 3,
            image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSplsohDyUtvtlcYH1S2cuNXW7YJ2_twj_5yTm3Hx_1UQR8AFHdl1c-8sC645PwkS6-iYk&usqp=CAU'
        )
    ]
    for lego in lego_images:
        db.session.add(lego)

    pika = Product_Image(
        product_id = 4,
        image_url = 'https://cdn.shopify.com/s/files/1/0585/7371/7661/products/165727508659-0_800x.jpg?v=1679360338',
        preview = True
    ) 
    db.session.add(pika)

    db.session.commit()

def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))
        
    db.session.commit()