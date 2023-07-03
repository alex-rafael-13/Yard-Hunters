from flask.cli import AppGroup
from .users import seed_users, undo_users
from .event_types import seed_event_types, undo_event_types
from .events import seed_events, undo_events
from .categories import seed_categories, undo_categories
from .conditions import seed_conditions, undo_conditions
from .products import seed_products, undo_products
from .product_images import seed_product_images, undo_product_images
from .event_images import seed_event_images, undo_event_images
from .event_comments import seed_event_comments, undo_event_comments

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_event_images()
        undo_events()
        undo_event_types()
        undo_product_images()
        undo_products()
        undo_categories()
        undo_conditions()
        undo_event_comments()
    seed_users()
    seed_event_types()
    seed_events()
    seed_event_images()
    seed_categories()
    seed_conditions()
    seed_products()
    seed_product_images()
    seed_event_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_event_images()
    undo_events()
    undo_event_types()
    undo_product_images()
    undo_products()
    undo_categories()
    undo_conditions()
    undo_event_comments()
    # Add other undo functions here