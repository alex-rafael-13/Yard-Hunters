from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, ForeignKey
from sqlalchemy.types import String, Integer, Boolean 


class Event_Image(db.Model):
    __tablename__ = 'event_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    #Table Columns
    id = Column(Integer, primary_key=True)
    event_id = Column(Integer, ForeignKey(add_prefix_for_prod('events.id')), nullable=False)
    image_url = Column(String, nullable=False)
    preview = Column(Boolean, default=False)

    #Relationships
    events = db.relationship('Event', back_populates='event_images')

    #Instance Methods
    def to_dict(self):
        return {
            'id': self.id,
            'event_id': self.id,
            'image_url': self.image_url,
            'preview': self.preview
        }
    