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

@product_routes.route('/')
def products_list():
    products = Product.query.all()

    #err handling
    if not products:
       return {
           'err': 'Marketplace Cannot Be Reached at This Moment'
       }, 404
    
    return [product.list_to_dict() for product in products]

@product_routes.route('/<int:product_id>')
def single_product(product_id):
    product = Product\
        .query\
        .filter(Product.id == product_id).first()
    
    if not product:
       return {
           'err': 'Product Not Found'
       }, 404
    
    return product.single_to_dict()



@product_routes.route('/test')
def test():
    return {
        'test': 'product routes successfully connected'
    }
