from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column
from sqlalchemy.types import String, Integer 

class Event_Type(db.Model):
    __tablename__ = 'event_types'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = Column(Integer, primary_key=True)
    type = Column(String, nullable=False)

    #Relationships
    events = db.relationship('Event', back_populates='type')

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type  
        }