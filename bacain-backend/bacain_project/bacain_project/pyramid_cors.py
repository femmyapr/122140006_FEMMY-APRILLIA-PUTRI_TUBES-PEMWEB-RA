from pyramid.response import Response
from pyramid.events import NewResponse

def add_cors_headers(event):
    response = event.response
    response.headers.update({
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
    })

def options_view(request):
    # Respon untuk preflight OPTIONS request
    return Response(status=200)
