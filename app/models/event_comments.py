from .db import db, environment, SCHEMA, add_prefix_for_prod
from . import Event, User
from sqlalchemy import Column, ForeignKey
from sqlalchemy.types import String, Integer, Date, Time 
from datetime import date, datetime

class Event_Comments(db.Model):
    __tablename__ = 'event_comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    #Table Columns
    id = Column(Integer, primary_key = True)
    event_id = Column(Integer, ForeignKey(add_prefix_for_prod('events.id')), nullable=False)
    user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    comment_body = Column(String(100), nullable=False)
    date_created = Column(Date, default=date.today())
    time_created = Column(Time, default=datetime.now().time())

    #Relationships:
    user = db.relationship('User', back_populates='event_comments')
    event = db.relationship('Event', back_populates='comments')


