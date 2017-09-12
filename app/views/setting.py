from aiohttp import web
from ..db import settings, update_settings


async def get(request):
    name = request.match_info['name']
    async with request.app['db'].acquire() as conn:
        req = await conn.execute(settings.select().where(settings.c.name == name))
        setting = await req.first()
        return web.Response(body=setting.content, content_type='application/json')

async def update(request):
    name = request.match_info['name']
    content = request.query['content']
    update_settings(request.app, name, content)
    return web.Response(body='{"status": "ok"}', content_type='application.json')


