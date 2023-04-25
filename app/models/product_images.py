from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, ForeignKey
from sqlalchemy.types import String, Integer, Boolean

class Product_Image(db.Model):
    __tablename__ = 'product_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, nullable=False)
    image_url = Column(String, nullable=False)
    preview = Column(Boolean, default=False)