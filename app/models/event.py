from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, ForeignKey
from sqlalchemy.types import String, Integer, Date, Time 

class Event(db.Model):
    __tablename__ = 'events'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    #Table Columns
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    description = Column(String(1000))
    host_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    event_type_id = Column(Integer, ForeignKey(add_prefix_for_prod('event_types.id')), nullable=False)
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    country = Column(String, nullable=False)
    date = Column(Date)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)

    #Relationships:
    host = db.relationship('User', back_populates='events')
    type = db.relationship('Event_Type', back_populates='events')

    #Making it jsonable
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'host_id': self.host_id,
            'event_type_id': self.event_type_id,
            'date': self.date,
            'start_time': self.start_time,
            'end_time': self.end_time
        }
