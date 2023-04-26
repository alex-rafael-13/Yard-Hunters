from flask_wtf import FlaskForm
from wtforms import StringField, TimeField, IntegerField, FloatField 
from wtforms.validators import DataRequired, ValidationError

class ProductForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired()])
    description = StringField('description')
    event_id = IntegerField('event_id')
    condition_id = IntegerField('condition_id', validators=[DataRequired()])
    category_id = IntegerField('category_id', validators=[DataRequired()])
