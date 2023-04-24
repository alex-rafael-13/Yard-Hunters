from flask import Blueprint, request
from app.models import db, Event
from app.forms import EventForm
from flask_login import login_required, current_user
from datetime import time, date

event_routes = Blueprint('events', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

#Get all events 
@event_routes.route('/')
# @login_required
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

@event_routes.route('/new', methods=['POST'])
@login_required
def new_event():
    form = EventForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        #Turning time inputs into actual time values
        split_start = form.data['start_time'].split(':')
        s_time = time(int(split_start[0]), int(split_start[1]))

        split_end = form.data['end_time'].split(':')
        e_time = time(int(split_end[0]), int(split_end[1]))

        #Turning date input from string to date
        form_date = form.data['date'].split('-')
        date_entered = date(int(form_date[0]), int(form_date[1]), int(form_date[2]))
        
        event = Event(
            name = form.data['name'],
            description = form.data['description'],
            host_id = current_user.id,
            event_type_id = form.data['event_type_id'],
            address = form.data['address'],
            city = form.data['city'],
            state = form.data['state'],
            country = form.data['country'],
            date = date_entered,
            start_time = s_time,
            end_time = e_time
        )
        db.session.add(event)
        db.session.commit()
        single_event(event.id)
        return event.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#Edit or Delete event if user signed in user is the host
@event_routes.route('/<int:event_id>/manage', methods=['PUT', 'DELETE'])
@login_required
def edit_event(event_id):

    event = Event.query.filter(Event.id==event_id).first()

    #Check if event is exists
    if not event:
       return {
           'err': 'Event not Found'
       }, 404
    
    event_dict = event.to_dict()
    #Check if user is authorized to edit/delete event
    if event_dict['host']['id'] != current_user.id:
        return {
           'err': 'Unautharized'
       }, 401

    '''
    EDITING AN EVENT IF SIGNED IN USER IS THE HOST
    '''
    if request.method == 'PUT':
        form = EventForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():

                #Turning time inputs into actual time values
            split_start = form.data['start_time'].split(':')
            s_time = time(int(split_start[0]), int(split_start[1]))

            split_end = form.data['end_time'].split(':')
            e_time = time(int(split_end[0]), int(split_end[1]))

            #Turning date input from string to date
            form_date = form.data['date'].split('-')
            date_entered = date(int(form_date[0]), int(form_date[1]), int(form_date[2]))
            
            event.name = form.data['name']
            event.description = form.data['description']
            event.host_id = current_user.id
            event.event_type_id = form.data['event_type_id']
            event.address = form.data['address']
            event.city = form.data['city']
            event.state = form.data['state']
            event.country = form.data['country']
            event.date = date_entered
            event.start_time = s_time
            event.end_time = e_time

            db.session.commit()

            single_event(event.id)
            return event.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    '''
    DELETING AN EVENT IF SIGNED IN USER IS THE HOST
    '''
    if request.method == 'DELETE':
        db.session.delete(event)
        db.session.commit()
        return {
            'message': 'Event Successfully Deleted'
        }, 200
