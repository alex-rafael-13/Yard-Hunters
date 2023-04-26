from flask import Blueprint, request
from app.models import db, Product
from flask_login import login_required, current_user
from datetime import time, date

product_routes = Blueprint('products', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@product_routes.route('/test')
def test():
    return {
        'test': 'product routes successfully connected'
    }
