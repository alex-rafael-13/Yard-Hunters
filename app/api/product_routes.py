from flask import Blueprint, request
from app.models import db, Product, Category, Product_Condition, Product_Image
from flask_login import login_required, current_user
from app.forms import ProductForm

product_routes = Blueprint('products', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
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

@product_routes.route('/current')
@login_required
def user_products():
    products = Product.query\
        .filter(Product.owner_id == current_user.id)\
        .all()

    if not products:
        return {
            'err': 'User has no events'
        }, 404
    
    return [product.list_to_dict() for product in products]

@product_routes.route('/new', methods=['POST'])
@login_required
def new_product():
    form = ProductForm()
    data = request.get_json()
    preview_image = data['preview_image']
    print(preview_image)

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product = Product(
            name = form.data['name'],
            owner_id = current_user.id,
            price = form.data['price'],
            description = form.data['description'],
            event_id = form.data['event_id'],
            condition_id = form.data['condition_id'],
            category_id = form.data['category_id'],
        )

        db.session.add(product)
        db.session.commit()
        image = Product_Image(
            product_id = product.id,
            image_url = preview_image,
            preview = True
        )
        db.session.add(image)
        db.session.commit()

        return product.single_to_dict()
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@product_routes.route('/<int:product_id>/manage', methods=['PUT', 'DELETE'])
@login_required
def manage_product(product_id):
    print('in here')
    print(current_user.id)

    product = Product.query.filter(Product.id == product_id, Product.owner_id == current_user.id).first()
    print('past here')
    
    if not product:
       return {
           'err': 'Unauthorized'
       }, 401
    
    '''
    EDITING PRODUCT
    '''
    if request.method == 'PUT':
        form = ProductForm()

        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            product.name = form.data['name']
            product.price = form.data['price']
            product.description = form.data['description']
            product.event_id = form.data['event_id']
            product.condition_id = form.data['condition_id']
            product.category_id = form.data['category_id']

            db.session.commit()
            return product.single_to_dict()
    
    '''
    DELETING A PRODUCT
    '''
    if request.method == 'DELETE':
        print('\n\n\n\n', product)
        db.session.delete(product)
        db.session.commit()
        return {
            'message': 'Product Successfully Deleted'
        }, 200
    
@product_routes.route('/categories')
def get_categories():
    categories = Category.query.all()

        #err handling
    if not categories:
        return {
            'err': 'Marketplace Cannot Be Reached at This Moment'
        }, 404
        
    return [category.to_dict() for category in categories]

@product_routes.route('/conditions')
def get_conditions():
    conditions = Product_Condition.query.all()

        #err handling
    if not conditions:
        return {
            'err': 'Marketplace Cannot Be Reached at This Moment'
        }, 404
        
    return [condition.to_dict() for condition in conditions]
    

@product_routes.route('/test')
def test():
    return {
        'test': 'product routes successfully connected'
    }
