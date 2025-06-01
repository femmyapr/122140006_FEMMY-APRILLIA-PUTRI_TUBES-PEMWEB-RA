from sqlalchemy import engine_from_config
from sqlalchemy.orm import scoped_session, sessionmaker, configure_mappers
import zope.sqlalchemy

# Import model agar Base metadata mengenali semua model
from .user import User
from .mymodel import MyModel  # sesuaikan dengan model yang kamu punya

configure_mappers()  # Pastikan semua relasi siap

from .meta import Base  # import Base dari meta.py

# Session global yang bisa dipakai di luar request
DBSession = scoped_session(sessionmaker())

def get_engine(settings, prefix='sqlalchemy.'):
    return engine_from_config(settings, prefix)

def get_session_factory(engine):
    factory = sessionmaker()
    factory.configure(bind=engine)
    return factory

def get_tm_session(session_factory, transaction_manager):
    """
    Buat session yang terikat dengan transaction manager Pyramid
    """
    dbsession = session_factory()
    zope.sqlalchemy.register(dbsession, transaction_manager=transaction_manager)
    return dbsession

def includeme(config):
    """
    Setup model dan session untuk Pyramid app.
    Aktifkan dengan config.include('bacain_project.models')
    """
    settings = config.get_settings()
    settings['tm.manager_hook'] = 'pyramid_tm.explicit_manager'

    config.include('pyramid_tm')      # transaction manager
    config.include('pyramid_retry')   # retry mekanisme otomatis

    session_factory = get_session_factory(get_engine(settings))
    config.registry['dbsession_factory'] = session_factory

    # Tambahkan request.dbsession yang otomatis transaction managed
    config.add_request_method(
        lambda r: get_tm_session(session_factory, r.tm),
        'dbsession',
        reify=True
    )
