import sqlalchemy as sa
import aiomysql.sa
from hashlib import sha256
import datetime as dt
from .models.pictures import get_pictures
from .models.users import get_users
from .models.settings import get_settings


metadata = sa.MetaData()

"""
Tables
"""
pictures = get_pictures(metadata)
users = get_users(metadata)
settings = get_settings(metadata)

async def create_default_user(app):
    """
    Creates the default user root:root
    """
    username, password = app['_db_config']
    async with app['db'].acquire() as conn:
        password = sha256((password + app['config']['security']['salt']).encode()).hexdigest()
        await conn.execute(users.insert().values(username=username, password=password))
        await conn.execute('commit')

async def create_settings_rows(app):
    async with app['db'].acquire() as conn:
        await conn.execute(settings.insert().values(name="memory", content="100"))
        await conn.execute(settings.insert().values(name="photo_interval", content="10"))
        await conn.execute(settings.insert().values(name="status", content="unused"))
        await conn.execute(settings.insert().values(name="recording", content="0"))
        await conn.execute('commit')

async def setup_database(app):
    """
    Setup databases when main.py executed with the --setup flag
    """
    print("Creating tables...")
    async with app['db'].acquire() as conn:
        await conn.execute(sa.schema.CreateTable(pictures))
        await conn.execute(sa.schema.CreateTable(settings))
        await conn.execute(sa.schema.CreateTable(users))

async def insert_image(app, path):
    async with app['db'].acquire() as conn:
        await conn.execute(pictures.insert().values(path=path, is_active=True,
                                                    created_at=str(dt.datetime.now())))
        await conn.execute('commit')

async def update_settings(app, name, content):
    async with app['db'].acquire() as conn:
        await conn.execute(settings.update().where(settings.c.name == name).values(content=content))
        await conn.execute('commit')

async def init_database(app):
    """
    Initializes the database on startup
    """
    config = app['config']['database']
    engine = await aiomysql.sa.create_engine(
        db=config['database'],
        user=config['user'],
        password=config['password'],
        host=config['host'],
        port=config['port'],
    )
    app['db'] = engine

async def close_database(app):
    """
    Closes the database on cleanup
    """
    app['db'].close()
    await app['db'].wait_closed()
