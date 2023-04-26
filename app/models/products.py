from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, ForeignKey
from sqlalchemy.types import String, Integer, Float

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = Column(Integer, primary_key=True)
    owner_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    event_id = Column(Integer, ForeignKey(add_prefix_for_prod('events.id')))
    name = Column(String(255), nullable=False)
    price = Column(Float(precision=2), nullable=False)
    condition_id = Column(Integer, ForeignKey(add_prefix_for_prod('product_conditions.id')), nullable=False)
    category_id = Column(Integer, ForeignKey(add_prefix_for_prod('categories.id')),nullable=False)
    description = Column(String(1000))

    event = db.relationship('Event', back_populates='products')
    owner = db.relationship('User', back_populates='products')
    condition = db.relationship('Product_Condition', back_populates='products')
    category = db.relationship('Category', back_populates='products')
    images = db.relationship('Product_Image', backref='product')


    
