from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, Length, ValidationError
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class USDValidator:
    def __call__(self, form, field):
        amount = field.data
        try:
            # Check if the amount is a positive number
            if amount <= 0:
                raise ValueError("Amount must be a positive number")

            # Check if the amount has more than 2 decimal places
            if round(amount, 2) != amount:
                raise ValueError("Amount must have exactly 2 decimal places")

        except (ValueError, TypeError):
            raise ValidationError("Invalid USD amount")


class UpdateProductForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired(), USDValidator()])
    description = StringField('description', validators=[DataRequired(), Length(min=3, max=500)])
    event_id = IntegerField('event_id')
    condition_id = IntegerField('condition_id', validators=[DataRequired()])
    category_id = IntegerField('category_id', validators=[DataRequired()])

