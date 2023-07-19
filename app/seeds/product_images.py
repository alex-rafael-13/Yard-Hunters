from app.models import db, Product_Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_product_images():
    drill_images = [
        Product_Image(
            product_id = 1,
            image_url = 'http://yard-hunters.s3.amazonaws.com/2595ec2674ac45a880235d0cf3d1aec4.jpeg',
            preview = True
        )
    ]
    for drill in drill_images:
        db.session.add(drill)

    ps_images = [
        Product_Image(
            product_id = 2,
            image_url = 'http://yard-hunters.s3.amazonaws.com/0384aef9de354447b77539f4ce3fe4bb.jpeg',
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
            image_url = 'http://yard-hunters.s3.amazonaws.com/f3ff3d8a12ba4494aad2ef432ec4b9a8.jpg',
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
        image_url = 'http://yard-hunters.s3.amazonaws.com/685484ef3a06492cb4f177878fcb3354.jpg',
        preview = True
    ) 
    db.session.add(pika)

    chair = Product_Image(
        product_id = 5,
        image_url = 'http://yard-hunters.s3.amazonaws.com/93c96079f6eb45e08ef028374e0ea8a5.jpeg',
        preview = True
    ) 
    db.session.add(chair)

    lightsaber = Product_Image(
        product_id = 6,
        image_url = 'http://yard-hunters.s3.amazonaws.com/549f6ff5afc740c4b7ff8e3f0edc15cd.jpg',
        preview = True
    ) 
    db.session.add(lightsaber)

    shoes = Product_Image(
        product_id = 7,
        image_url = 'http://yard-hunters.s3.amazonaws.com/7ee6bf45858c4a8292f2630181edcded.jpeg',
        preview = True
    ) 
    db.session.add(shoes)

    tacos = Product_Image(
        product_id = 8,
        image_url = 'http://yard-hunters.s3.amazonaws.com/82327b20ec6643fc80ea998ef71562f4.jpeg',
        preview = True
    ) 
    db.session.add(tacos)

    burritos = Product_Image(
        product_id = 9,
        image_url = 'http://yard-hunters.s3.amazonaws.com/2e0bec3e7cbf4aaeb99231660216d170.jpeg',
        preview = True
    ) 
    db.session.add(burritos)

    mulitas = Product_Image(
        product_id = 10,
        image_url = 'http://yard-hunters.s3.amazonaws.com/9525f894c07f433aaf3a192f4f082fd4.jpeg',
        preview = True
    )
    db.session.add(mulitas)
    quesadillas = Product_Image(
        product_id = 11,
        image_url = 'http://yard-hunters.s3.amazonaws.com/bf4415a234f442128a34df739d198070.jpeg',
        preview = True
    )
    db.session.add(quesadillas)
    tortas = Product_Image(
        product_id = 12,
        image_url = 'http://yard-hunters.s3.amazonaws.com/08d4b01885c24580a14fc3603f60dcb0.jpeg',
        preview = True
    )
    db.session.add(tortas)
    aguas = Product_Image(
        product_id = 13,
        image_url = 'http://yard-hunters.s3.amazonaws.com/5ac374eb6c4c46f893785270186810b7.jpeg',
        preview = True
    )
    db.session.add(aguas)


    db.session.commit()

def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))
        
    db.session.commit()