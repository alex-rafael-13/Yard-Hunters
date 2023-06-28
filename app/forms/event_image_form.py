from flask_wtf import FlaskForm
from wtforms import StringField, FileField,IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from flask_wtf.file import FileAllowed, FileRequired
from datetime import date, time, timedelta, datetime
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class EventImageForm(FlaskForm):
    image_file = FileField('image_file', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    
