import json
from aiohttp import web
from os import path
from ..db import pictures, insert_image


async def index(request):
    image_path = path.abspath(path.join(path.dirname(__file__), '../resources/images/' + request.match_info['name'] + '.jpg'))
    if path.exists(image_path):
        with open(image_path, 'rb') as image:
            return web.Response(body=image.read(), content_type='image/jpeg')
    return web.Response(status=404, body="<h1>File not Found</h1>")

async def get(request):
    async with request.app['db'].acquire() as conn:
        result = await conn.execute(pictures.select().order_by(pictures.c.created_at.desc()))
        image = await result.first()
    if image is not None:
        return web.Response(body=json.dumps({
            'id': image[0],
            'path': image[1],
            'created_at': str(image[2]),
            'is_active': image[3]
        }), content_type='application/json')
    return web.Response(body='"Does not exist"', status=404, content_type='application/json')

async def add(request):
    if 'path' not in request.query:
        return web.Response(body='"Forbidden"', status=403)
    await insert_image(request.app, request.query['path'])
    return web.Response(body='"picture inserted"', content_type='application/json')

async def delete(request):
    name = request.match_info['name']
    async with request.app['db'].acquire() as conn:
        await conn.execute(pictures.delete().where(pictures.c.path == name))
        await conn.execute('commit')
    return web.Response(body='"picture deleted"', content_type='application/json')

