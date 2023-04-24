from flask import Blueprint, request
from app.models import db, Event_Type
from flask_login import login_required, current_user
from datetime import time, date

types_routes = Blueprint('event_types', __name__)

@types_routes.route('/')
def getTypes():

    types = Event_Type.query.all()

    if not types:
       return {
           'err': 'Types Cannot Be Reached at This Moment'
       }, 404
    
    return [type.to_dict() for type in types]


