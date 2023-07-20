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
    ice_cream = Product_Image(
        product_id = 14,
        image_url = 'http://yard-hunters.s3.amazonaws.com/74e04d63966f4d27b044573d076761bc.jpeg',
        preview = True
    )
    db.session.add(ice_cream)
    paletas = Product_Image(
        product_id = 15,
        image_url = 'http://yard-hunters.s3.amazonaws.com/d9b616f3f0f54da599e694d8becd6619.jpeg',
        preview = True
    )
    db.session.add(paletas)
    banana = Product_Image(
        product_id = 16,
        image_url = 'http://yard-hunters.s3.amazonaws.com/9a0e7053634c45759a94c149a1fe5a00.jpeg',
        preview = True
    )
    db.session.add(banana)
    sundae = Product_Image(
        product_id = 17,
        image_url = 'http://yard-hunters.s3.amazonaws.com/04191378a9ed48608423a82c199f71ef.jpeg',
        preview = True
    )
    db.session.add(sundae)
    electrical = Product_Image(
        product_id = 18,
        image_url = 'http://yard-hunters.s3.amazonaws.com/e480ed8029df4353a8f5590086bdc99b.png',
        preview = True
    )
    db.session.add(electrical)
    pots = Product_Image(
        product_id = 19,
        image_url = 'http://yard-hunters.s3.amazonaws.com/f5146f8e55864f588c67acf63028a9bb.jpeg',
        preview = True
    )
    db.session.add(pots)
    art = Product_Image(
        product_id = 20,
        image_url = 'http://yard-hunters.s3.amazonaws.com/5fe5da8a365c45ed9e12e008c7edcf26.jpeg',
        preview = True
    )
    db.session.add(art)
    skate = Product_Image(
        product_id = 21,
        image_url = 'http://yard-hunters.s3.amazonaws.com/1bf4cf6eea9044fdae385abb10396dea.jpeg',
        preview = True
    )
    db.session.add(skate)
    katana = Product_Image(
        product_id = 22,
        image_url = 'http://yard-hunters.s3.amazonaws.com/93dec8b63dce418b9de83a443a90d3b0.jpeg',
        preview = True
    )
    db.session.add(katana)
    jersey = Product_Image(
        product_id = 23,
        image_url = 'http://yard-hunters.s3.amazonaws.com/2f19b4d339304bf08d71b1dc6559fcb5.jpeg',
        preview = True
    )
    db.session.add(jersey)
    couch = Product_Image(
        product_id = 24,
        image_url = 'http://yard-hunters.s3.amazonaws.com/34dc4c3c6f53420f9d76a83de5e8fcd2.jpeg',
        preview = True
    )
    db.session.add(couch)
    ladder = Product_Image(
        product_id = 25,
        image_url = 'http://yard-hunters.s3.amazonaws.com/495acc6eba154580948436b4f01130e4.jpeg',
        preview = True
    )
    db.session.add(ladder)
    shuffle = Product_Image(
        product_id = 26,
        image_url = 'http://yard-hunters.s3.amazonaws.com/889729935a5c492d9c0e8da93484f0b6.jpeg',
        preview = True
    )
    db.session.add(shuffle)


    db.session.commit()

def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))
        
    db.session.commit()