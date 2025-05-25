# setup flask app, load config, init db, register routes

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config
from models import db
from routes import register_routes

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, origins=["http://localhost:3000"])
db.init_app(app)

with app.app_context():
    db.create_all()

register_routes(app)

print("Starting app...")

if __name__ == '__main__':
    app.run(port=5000, debug=True)