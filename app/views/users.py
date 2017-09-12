import hashlib
from aiohttp import web
from ..db import users

async def add(request):
    if 'password' not in request.query or 'username' not in request.query:
        return web.Response(body='"Missing parameters"', status=400)
    async with request.app['db'].acquire() as conn:
        password = hashlib.sha256((request.query['password'] + request.app['config']['security']['salt']).encode()).hexdigest()
        await conn.execute(users.insert().values(username=request.query['username'], password=password))
        await conn.execute('commit')
    return web.Response(body='"success"', content_type='application/json')

async def change_password(request):
    if 'password' not in request.query or 'username' not in request.query:
        return web.Response(body='"Missing parameters"', status=400)
    async with request.app['db'].acquire() as conn:
        password = hashlib.sha256((request.query['password'] + request.app['config']['security']['salt']).encode()).hexdigest()
        await conn.execute(users.update().where(username=request.query['username']).values(password=password))
        await conn.execute('commit')
    return web.Response(body='"success"', content_type='application/json')

