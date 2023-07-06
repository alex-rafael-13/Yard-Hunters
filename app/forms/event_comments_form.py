from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length

class CommentForm(FlaskForm):
    comment_body = StringField('comment_body', validators=[DataRequired(), Length(min=3, max=150)])
