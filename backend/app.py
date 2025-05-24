# setup flask app, load config, init db, register routes

from flask import Flask
from config import Config
from models import db
from routes import main

