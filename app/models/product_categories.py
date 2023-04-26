from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, ForeignKey
from sqlalchemy.types import String, Integer

class Category(db.Model):
    __tablename__ = 'categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = Column(Integer, primary_key=True)
    category = Column(String, nullable=False)

    products = db.relationship('Product', back_populates='category')