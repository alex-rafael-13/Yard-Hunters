from flask import Blueprint
from app.models import db, Event, Event_Type, User
from flask_login import login_required, current_user

event_routes = Blueprint('events', __name__)

#Get all events 
@event_routes.route('/')
@login_required
def event_list():

    events = Event.query.all()

    #err handling
    if not events:
       return {
           'err': 'Events Cannot Be Reached at This Moment'
       }, 404
    
    return [event.to_dict() for event in events]

#Get an event by event_id
@event_routes.route('/<int:event_id>')
@login_required
def single_event(event_id):

    event = Event.query.filter(Event.id==event_id).first()

    #err handling
    if not event:
       return {
           'err': 'Event not Found'
       }, 404

    return event.to_dict()

#Get all events of the current user
@event_routes.route('/current')
@login_required
def user_events():
    events = Event.query\
        .filter(Event.host_id==current_user.id)\
        .all()
    
    #err handling
    if not events:
        return {
            'err': 'User has no events'
        }, 404
    
    return [event.to_dict() for event in events]
