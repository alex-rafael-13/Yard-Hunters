from .db import db, environment, SCHEMA, add_prefix_for_prod
from . import Event, User
from sqlalchemy import Column, ForeignKey
from sqlalchemy.types import String, Integer, Date, Time 
from datetime import date, datetime

class Event_Comment(db.Model):
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

    def to_dict(self):
        return {
            "id": self.id,
            # "event": self.event.dict_for_products(),
            "user": self.user.dict_for_event(),
            "comment_body": self.comment_body,
            "date_created": self.date_created.strftime('%b %d, %Y'),
            "time_created": self.time_created.strftime('%I:%M %p').lstrip('0')
        }
    



