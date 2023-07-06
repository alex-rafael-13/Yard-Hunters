from flask import Blueprint, request, jsonify
from app.models import db, Event, Event_Comment
from app.forms import EventForm, EventImageForm, UpdateEventForm, CommentForm
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

@comment_routes.route('/events/<int:event_id>')
def single_event_comments(event_id):
    comments = Event_Comment.query.filter(Event_Comment.event_id == event_id).all()

    if not comments:
        return
    return [comment.to_dict() for comment in comments]

@comment_routes.route('/current')
@login_required
def user_comments():
    comments = Event_Comment.query.filter(Event_Comment.user_id == current_user.id).all()

    if not comments:
        return
    return [comment.to_dict() for comment in comments]

@comment_routes.route('/<int:event_id>/new', methods=['POST'])
@login_required
def create_comment(event_id):
    form = CommentForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Event_Comment(
            event_id = event_id,
            user_id = current_user.id,
            comment_body = form.data['comment_body']
        )

        db.session.add(comment)
        db.session.commit()

        return comment.to_dict()
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@comment_routes.route('/<int:comment_id>/manage', methods=['PUT', 'DELETE'])
@login_required
def edit_comment(comment_id):

    comment = Event_Comment.query.filter(Event_Comment.id==comment_id, Event_Comment.user_id==current_user.id).first()

    if not comment:
        return {
            'err': 'Comment Cannot Be Reached at This Moment'
        }, 404
    
    if request.method == 'PUT':
        form = CommentForm()
        # Get the csrf_token from the request cookie and put it into the
        # form manually to validate_on_submit can be used
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            comment.comment_body = form.data['comment_body']

            db.session.commit()

            return comment.to_dict()
        
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    
    if request.method == 'DELETE':
        db.session.delete(comment)
        db.session.commit()

        return {
            "message": 'Successfully Deleted'
        }


