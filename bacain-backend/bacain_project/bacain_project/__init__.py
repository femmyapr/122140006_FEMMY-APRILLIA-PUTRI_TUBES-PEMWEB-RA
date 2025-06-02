from pyramid.config import Configurator
from pyramid.response import Response
from pyramid.events import NewResponse
from .models import DBSession, Base
from sqlalchemy import engine_from_config
from . import routes

def add_cors_headers(event):
    response = event.response
    response.headers.update({
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
    })
    return response

def options_view(request):
    return Response(status=200)

def main(global_config, **settings):
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine

    with Configurator(settings=settings) as config:
        config.include('pyramid_jinja2')
        config.include('.models')

        routes.includeme(config)
        config.scan('.views')

        # Tambahkan subscriber untuk CORS headers
        config.add_subscriber(add_cors_headers, NewResponse)

        # Route OPTIONS untuk /api/register
        config.add_route('register_options', '/api/register', request_method='OPTIONS')
        config.add_view(options_view, route_name='register_options')

        # Route OPTIONS untuk /api/login
        config.add_route('login_options', '/api/login', request_method='OPTIONS')
        config.add_view(options_view, route_name='login_options')

        app = config.make_wsgi_app()

    return app
