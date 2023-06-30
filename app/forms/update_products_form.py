from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, FileField
from wtforms.validators import DataRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class UpdateProductForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    event_id = IntegerField('event_id')
    condition_id = IntegerField('condition_id', validators=[DataRequired()])
    category_id = IntegerField('category_id', validators=[DataRequired()])

