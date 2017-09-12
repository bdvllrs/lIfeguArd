from .middlewares.auth import auth_middleware


def setup_middlewares(app):
    app.middlewares.append(auth_middleware)
