from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, ForeignKey
from sqlalchemy.types import String, Integer, Boolean

class Product_Image(db.Model):
    __tablename__ = 'product_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey(add_prefix_for_prod('products.id')),nullable=False)
    image_url = Column(String, nullable=False)
    preview = Column(Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'image_url': self.image_url,
            'preview': self.preview
        }