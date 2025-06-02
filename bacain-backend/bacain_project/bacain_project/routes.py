def includeme(config):
    print(">>> includeme routes dipanggil")
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('api_users', '/api/users')   
    config.add_route('register', '/api/register')
    config.add_route('login', '/api/login')
