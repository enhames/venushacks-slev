# create simple routes like signup login and mood logging
# to run: python3 app.py

# i handle my own flask host whatever tf 
from .user_routes import user_routes

def register_routes(app):
    app.register_blueprint(user_routes)