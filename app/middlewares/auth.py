from aiohttp import web
from hashlib import sha256
from basicauth import decode
from ..db import users as users_model


async def auth_middleware(app, handler):
    async def auth_handler(request):
        if str(request.rel_url)[:4] == '/api':
            authorization = request.headers.get('Authorization')
            if authorization is not None and authorization[:5] == 'Basic':
                # Check if the user is correct
                username, password = decode(authorization)
                # Add application salt
                password += app['config']['security']['salt']
                async with app['db'].acquire() as conn:
                    result = await conn.execute(users_model.select().where(users_model.c.username == username))
                    record = await result.first()
                    # If the password is correct...
                    if sha256(password.encode()).hexdigest() == record.password:
                        return await handler(request)
            return web.Response(text='Forbidden', status='403')
        else:
            return await handler(request)
    return auth_handler
