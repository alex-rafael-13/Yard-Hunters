from .db import db, environment, SCHEMA, add_prefix_for_prod
from .event_images import Event_Image
from sqlalchemy import Column, ForeignKey
from sqlalchemy.types import String, Integer, Date, Time 
from datetime import date, timedelta 

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
    products = db.relationship('Product', back_populates='event')
    event_images = db.relationship('Event_Image', back_populates='events', cascade='all, delete-orphan')


    #Instance Methods
    '''Check date of event'''
    def check_date(self):
        today = date.today()
        event_date = self.date

        if event_date == today+timedelta(1):
            return 'Tomorrow!'
        elif today == event_date:
            return 'Today!'
        else:
            return event_date.strftime('%b %d, %Y')

    '''Returns products if any'''
    def check_products(self):
        if self.products == None:
            return None
        else:
            products = self.products

            return [product.dict_for_event() for product in products]

    '''Gets preview image of event'''
    def preview_image(self):
        preview_image = Event_Image\
            .query\
            .filter(Event_Image.event_id == self.id, Event_Image.preview == True)\
            .first()
        
        if preview_image:
            return preview_image.to_dict()['image_url']
        return None

    '''turns it to a dict'''
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'host': self.host.dict_for_event(),
            'event_type': self.type.type,
            'event_type_id': self.type.id,
            'date': self.check_date(),
            'start_time': self.start_time.strftime('%I:%M %p'),
            'end_time': self.end_time.strftime('%I:%M %p'),
            'product_list': self.check_products(),
            'image_url': self.preview_image()
        }
    
    def dict_for_products(self):
        return {
            'id': self.id,
            'name': self.name
        }
