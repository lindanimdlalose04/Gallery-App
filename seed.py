from app import app, db
from models import Category, Image
import os

with app.app_context():
    # Delete existing tables if needed
    # db.drop_all()
    # db.create_all()

    # Define categories and files
    gallery = {
        "Auquatic": [
            'auqatic.jpg', 'auqatic2.jpg', 'auqatic3.jpg', 'auqatic4.jpg', 'crocodile.jpg'       
        ],
        "Birds": [
            'bird1.jpg', 'bird2.jpg', 'bird3.jpg', 'bird4.jpg',
            'bird5.jpg', 'bird6.jpg'
        ],
        "Exotic":[
            'panda.jpg','wold2.jpg','porkupine.jpg','wolf','caottee.jpg'

        ],
        "Insects": [
            'bee.jpg', 'insects1.jpg', 'insects2.jpg', 'butterfly.jpg','spider.jpg'
        ],
        "Safari": [
            'ape.jpg', 'ape2.jpg', 'safari.jpg',
            'giraffee.jpg', 'safari1.jpg', 'safari2.jpg', 'safari3.jpg','zebra.jpg'
        ]

    }

    for cat_name, files in gallery.items():
        category = Category.query.filter_by(name=cat_name).first()
        if not category:
            category = Category(name=cat_name)
            db.session.add(category)
            db.session.commit()

        for f in files:
            # Check if file already exists in DB
            if not Image.query.filter_by(filename=f).first():
                img = Image(filename=f, category_id=category.id)
                db.session.add(img)
    db.session.commit()
    print("DB seeded!")
