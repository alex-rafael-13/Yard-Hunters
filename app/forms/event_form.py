from flask_wtf import FlaskForm
from wtforms import StringField, TimeField, IntegerField, DateField 
from wtforms.validators import DataRequired, ValidationError
from datetime import date, time


#Validator that checks if date inputed is past today
def validateDate(form, field):
    today = date.today()
    form_date = field.data.split('-')
    date_entered = date(int(form_date[0]), int(form_date[1]), int(form_date[2]))
    print(date_entered)
    if today > date_entered:
        raise ValidationError('Event Date Must Be After Today\'s Date')   

class EventForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    event_type_id = IntegerField('event_type_id', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    date = StringField('date', validators=[DataRequired(), validateDate])
    start_time = StringField('start_time', validators=[DataRequired()])
    end_time = StringField('end_time', validators=[DataRequired()])




