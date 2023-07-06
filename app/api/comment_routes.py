from flask import Blueprint, request, jsonify
from app.models import db, Event, Event_Comment
from app.forms import EventForm, EventImageForm, UpdateEventForm
from flask_login import login_required, current_user
from datetime import time, date
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

comment_routes = Blueprint('comments', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages

@comment_routes.route('/')
def comment_list():
    comments = Event_Comment.query.all()

    #err handling
    if not comments:
        return {
            'err': 'Comments Cannot Be Reached at This Moment'
        }, 404
    
    return [comment.to_dict() for comment in comments]

