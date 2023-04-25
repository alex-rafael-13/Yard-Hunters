from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, ForeignKey
from sqlalchemy.types import String, Integer, Float

class Product_Condition(db.Model):
    __tablename__ = "product_conditions"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = Column(Integer, primary_key=True)
    condition = Column(String, nullable=False)

    products = db.relationship('Product', back_populates='condition')    