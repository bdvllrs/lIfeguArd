import sys

import socketio
from aiohttp import web

from app.db import init_database, close_database, setup_database, create_default_user, create_settings_rows
from app.jobs.camera import start_camera
from app.middleware import setup_middlewares
from app.routes.api import setup_api_routes
from import_config import import_config
from websockets import websockets

sio = socketio.AsyncServer(async_mode='aiohttp')
app = web.Application()
sio.attach(app)
app['config'] = import_config(sys.argv)
app['io_users'] = []

websockets(app, sio)

async def start_jobs(app):
    app['camera'] = app.loop.create_task(start_camera(app, sio))

async def stop_jobs(app):
    app['camera'].cancel()
    await app['camera']

app.on_startup.append(init_database)
if '--setup' in sys.argv:
    app.on_startup.append(setup_database)
if '--seed' in sys.argv:
    app.on_startup.append(create_settings_rows)
if '--add-user' in sys.argv and len(sys.argv) > sys.argv.index('--add-user') + 2:
    flag_index = sys.argv.index('--add-user')
    app['_db_config'] = sys.argv[flag_index+1], sys.argv[flag_index+2]
    app.on_startup.append(create_default_user)
app.on_startup.append(setup_middlewares)
# Start jobs
app.on_startup.append(start_jobs)
app.on_cleanup.append(stop_jobs)
app.on_cleanup.append(close_database)
setup_api_routes(app)  # Sets the routes

if __name__ == '__main__':
    web.run_app(app, host=app['config']['app']['host'], port=app['config']['app']['port'])

