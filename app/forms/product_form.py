from flask_wtf import FlaskForm
from wtforms import StringField, TimeField, IntegerField, FloatField, FileField
from wtforms.validators import DataRequired, ValidationError
from flask_wtf.file import FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class ProductForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    event_id = IntegerField('event_id')
    condition_id = IntegerField('condition_id', validators=[DataRequired()])
    category_id = IntegerField('category_id', validators=[DataRequired()])
    preview_image = FileField('preview_image', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])

