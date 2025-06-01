from pyramid.view import view_config
from pyramid.response import Response
from bacain_project.models import DBSession, Base, User
from bacain_project.models import DBSession, User
import json

import logging
log = logging.getLogger(__name__)

@view_config(route_name='api_users', renderer='json', request_method='GET')
def get_users(request):
    users = DBSession.query(User).all()
    return {"users": [user.to_dict() for user in users]}

@view_config(route_name='register', renderer='json', request_method='POST')
def register_view(request):
    data = request.json_body
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if DBSession.query(User).filter((User.username == username) | (User.email == email)).first():
        request.response.status = 400
        return {'error': 'Username atau email sudah digunakan'}

    user = User(
        username=username,
        email=email,
        password_hash=User.hash_password(password)
    )
    DBSession.add(user)
    DBSession.commit()
    
    return {'message': 'Registrasi berhasil'}

@view_config(route_name='login', renderer='json', request_method='POST')
def login_view(request):
    data = request.json_body
    email = data.get('email')
    password = data.get('password')

    user = DBSession.query(User).filter_by(email=email).first()
    if not user or not user.verify_password(password):
        request.response.status = 401
        return {'error': 'Email atau password salah'}

    return {'message': 'Login berhasil'}
