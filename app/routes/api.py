# from ..views.index import index
from ..views.index import index
from ..views.setting import get as get_setting, update as update_setting
from ..views.images import index as image_view, add as add_image, get as get_image, delete as delete_image
from ..views.users import add as add_user, change_password


def setup_api_routes(app):
    app.router.add_get('/api/images/{name}', image_view)
    app.router.add_get('/api/setting/{name}', get_setting)
    app.router.add_put('/api/setting/{name}', update_setting)
    app.router.add_post('/api/user', add_user)
    app.router.add_put('/api/user', change_password)
    app.router.add_post('/api/picture', add_image)
    app.router.add_get('/api/picture/last', get_image)
    app.router.add_delete('/api/picture/{name}', delete_image)
    app.router.add_static('/assets', './app/resources/public/assets')
    app.router.add_get('/{route:.*}', index)
