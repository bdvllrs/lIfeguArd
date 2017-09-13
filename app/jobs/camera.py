import asyncio
import base64
from os import path

from ..db import settings, insert_image
from .Camera import Camera
from picamera import PiCamera


async def config_camera(app):
    async with app['db'].acquire() as conn:
        results = await conn.execute(settings.select())
        results = await results.fetchall()
    config = {}
    for result in results:
        config[result[1]] = result[2]
    return config

async def start_camera(app, sio):
    camera_config = await config_camera(app)
    camera = Camera()
    await run_camera(app, sio, camera)

async def run_camera(app, sio, camera):
    camera_config = await config_camera(app)
    # camera_config = {'recording': 0}
    if int(camera_config['recording']):
        with PiCamera() as c:
            camera.set_camera(c)
            filename = camera.capture()
            print('taking a picture...')
            image = path.abspath(path.join(path.dirname(__file__), '../resources/images/' + str(filename) + '.jpg'))
            await insert_image(app, filename)
            with open(image, 'rb') as f:
                await sio.emit('imageTaken', {'image': True, 'buffer': base64.b64encode(f.read()).decode()},
                               room='connected_users')
            # We add the file to the API
            # We clear the folder
            camera.clear(int(camera_config['memory']), int(camera_config['photo_interval']))
        await asyncio.sleep(0.5)
        await run_camera(app, sio, camera)
    await asyncio.sleep(2)
    await run_camera(app, sio, camera)
