from flask_wtf import FlaskForm
from wtforms import StringField, TimeField, IntegerField, DateField 
from wtforms.validators import DataRequired, ValidationError, Length
from datetime import date, time, timedelta, datetime


#Validator that checks if date inputed is past today
def validateDate(form, field):
    today = date.today()
    form_date = field.data.split('-')
    date_entered = date(int(form_date[0]), int(form_date[1]), int(form_date[2]))
    if today > date_entered:
        raise ValidationError('Event Date Must Be After Today\'s Date')

def validateEndTime(form, field):
    if form.start_time.data and field.data:
        start = time.fromisoformat(form.start_time.data)
        print(start)

        end = time.fromisoformat(field.data)
        print(end)

        if start > end:
            raise ValidationError('End time cannot be before start time.')
        if (datetime.min + timedelta(hours=start.hour, minutes=start.minute + 30)).time() > end:
            raise ValidationError('Event must last at least 30 minutes')

class EventForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(min=3, max=25)])
    description = StringField('description', validators=[DataRequired(), Length(min=10, max=100)])
    image_url = StringField('image_url')
    event_type_id = IntegerField('event_type_id', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    date = StringField('date', validators=[DataRequired(), validateDate])
    start_time = StringField('start_time', validators=[DataRequired()])
    end_time = StringField('end_time', validators=[DataRequired(), validateEndTime])




