from flask import Blueprint
from app.models import db, Event, Event_Type, User
from flask_login import login_required

event_routes = Blueprint('events', __name__)

@event_routes.route('/')
@login_required
def event_list():
    events = Event.query.all()
    print('\n\n\n\n', events)
    return {'events':[event.to_dict() for event in events]}