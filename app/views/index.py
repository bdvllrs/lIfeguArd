from aiohttp import web

async def index(request):
    return web.FileResponse('./app/resources/public/index.html')
