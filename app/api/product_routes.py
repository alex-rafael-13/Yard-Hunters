from flask import Blueprint, request, jsonify
from app.models import db, Product, Category, Product_Condition, Product_Image
from flask_login import login_required, current_user
from app.forms import ProductForm, ProductImageForm
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3


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

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        '''Uploading image to AWS'''
        preview_image = form.data['preview_image']
            
        #Changing name of file
        preview_image.filename = get_unique_filename(preview_image.filename)
        
        #uploading image to AWS
        uploaded_preview = upload_file_to_s3(preview_image)

        #Checking for errors when uploading to AWS
        if 'url' not in uploaded_preview:
            return jsonify({"error": "Error uploading file to AWS"}, 401)
    
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
            image_url = uploaded_preview['url'],
            preview = True
        )
        db.session.add(image)
        db.session.commit()

        return product.single_to_dict()
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@product_routes.route('/<int:product_id>/manage', methods=['PUT', 'DELETE'])
@login_required
def manage_product(product_id):
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
        print('\n\n\n','in here')
        if form.validate_on_submit():
            product.name = form.data['name']
            product.price = form.data['price']
            product.description = form.data['description']
            product.event_id = form.data['event_id']
            product.condition_id = form.data['condition_id']
            product.category_id = form.data['category_id']

            db.session.commit()
            return product.single_to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    
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
    
@product_routes.route('/<int:product_id>/manage/preview', methods=['PUT'])
@login_required
def update_preview_image(product_id):

    
    #Get image and event(event to check that current user is the owner)
    preview_image = Product_Image.query.filter(Product_Image.product_id==product_id, Product_Image.preview == True).first()
    product = Product.query.filter(Product.id==product_id).first()

    '''Error Handling'''
    if not preview_image:
        return {
            'err': 'Image not Found'
        }, 404
    if not product:
        return {
            'err': 'Product not Found'
        }, 404
    
    #Getting both event dict and prev image url
    product_dict = product.single_to_dict()
    prev_image_url = preview_image.to_dict()['image_url']
    #Check if user is authorized to edit/delete event
    if product_dict['seller']['id'] != current_user.id:
        return {
            'err': 'Unautharized'
        }, 401
    print('\n\n\n\n', product_dict)

    #Init a form
    form = ProductImageForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        '''Uploading image to AWS'''

        new_image = form.data['image_file']
        
        #Changing name of file
        new_image.filename = get_unique_filename(new_image.filename)
        
        #uploading image to AWS
        uploaded_preview = upload_file_to_s3(new_image)

        #Checking for errors when uploading to AWS
        if 'url' not in uploaded_preview:
            return jsonify({"error": "Error uploading file to AWS"}, 401)
        
        print('\n\n\n\n',product_dict)
        #Remove current image from aws
        remove_file_from_s3(prev_image_url)

        '''Updating database'''

        #Remove previous image
        db.session.delete(preview_image)
        db.session.commit()
        
        #Create new preview image and update the database
        new_preview = Product_Image(
            product_id = product_dict['id'],
            image_url = uploaded_preview['url'],
            preview = True
        )

        db.session.add(new_preview)
        db.session.commit()

        return new_preview.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    
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
