from pyramid.config import Configurator
from .models import DBSession, Base
from sqlalchemy import engine_from_config
from wsgicors import CORS
from . import routes  # import modul routes.py

def main(global_config, **settings):
    # Setup database engine dan session sebelum buat config
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine

    with Configurator(settings=settings) as config:
        config.include('pyramid_jinja2')
        config.include('.models')
        
        # Include routes secara manual
        routes.includeme(config)
        
        # Scan view modules
        config.scan('.views')

        # Buat aplikasi WSGI Pyramid
        app = config.make_wsgi_app()

        # Bungkus dengan middleware CORS
        app = CORS(
            app,
            allow_origins=['http://localhost:3000'],  # sesuaikan origin React kamu
            allow_methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allow_headers=['Content-Type', 'Authorization', 'Accept']
        )
        
    return app
