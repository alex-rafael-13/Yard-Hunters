from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, ForeignKey
from sqlalchemy.types import String, Integer, Numeric
from .product_images import Product_Image

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = Column(Integer, primary_key=True)
    owner_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    event_id = Column(Integer, ForeignKey(add_prefix_for_prod('events.id')))
    name = Column(String(255), nullable=False)
    price = Column(Numeric(precision=10, scale=2), nullable=False)
    condition_id = Column(Integer, ForeignKey(add_prefix_for_prod('product_conditions.id')), nullable=False)
    category_id = Column(Integer, ForeignKey(add_prefix_for_prod('categories.id')),nullable=False)
    description = Column(String(1000))

    event = db.relationship('Event', back_populates='products')
    seller = db.relationship('User', back_populates='products')
    condition = db.relationship('Product_Condition', back_populates='products')
    category = db.relationship('Category', back_populates='products')
    images = db.relationship('Product_Image', backref='product', cascade='all, delete-orphan')

    '''Get preview image'''
    def preview_image(self):
        image = Product_Image\
            .query\
            .filter(Product_Image.product_id == self.id, Product_Image.preview == True)\
            .first()
        
        if image:
            return image.to_dict()['image_url']
        return None

    '''Get all images'''
    def all_images(self):
        images = self.images

        return [image.to_dict() for image in images]

    
    '''Checks if tied to an event'''
    def check_event(self):
        if self.event == None:
            return None
        else:
            return self.event.dict_for_products()

    '''Make it json stringable'''
    def list_to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'preview_image': self.preview_image(),
            'price': self.price,
            'event': self.check_event(),
            "category": self.category.to_dict()
        }
    
    def dict_for_event(self):
        return {
            'id': self.id,
            'name': self.name,
            'preview_image': self.preview_image(),
            'price': self.price
        }
    
    def single_to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'seller': self.seller.dict_for_event(),
            'image_url': self.preview_image(),
            'price': self.price,
            'event': self.check_event(),
            'description': self.description,
            'category': self.category.to_dict(),
            'condition': self.condition.to_dict()
        }

    
