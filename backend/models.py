# define user and mood tables
from datetime import date
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import foreign
from sqlalchemy import and_

app = Flask(__name__)
db = SQLAlchemy(app)

class User(db.Model):
    username = db.Column(db.String(80), primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    partner_username = db.Column(db.String(80), db.ForeignKey('user.username'), nullable=True)
    has_periods = db.Column(db.Boolean, nullable=False)

    partner = db.relationship('User', remote_side=[username], uselist=False)
    moods = db.relationship('Mood', backref='user', lazy=True)
    periods = db.relationship(
        'Period',
        primaryjoin="and_(User.username == foreign(Period.user_username), User.has_periods == True)",
        backref='user',
        lazy=True
    )
class Period(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_username = db.Column(db.String(80), db.ForeignKey('user.username'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    had_period = db.Column(db.Boolean, nullable=False)
class Mood(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_username = db.Column(db.String(80), db.ForeignKey('user.username'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    mood = db.Column(db.String(50), nullable=False)

class Preferences(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_username = db.Column(db.String(80), db.ForeignKey('user.username'), nullable=False)
    sweet = db.Column(db.String(100))
    salty = db.Column(db.String(100))
    cold = db.Column(db.String(100))
    hot = db.Column(db.String(100))
    product = db.Column(db.String(100))
    love_lang = db.Column(db.String(100))
    msg = db.Column(db.String(100))

    user = db.relationship('User', backref=db.backref('preference'), uselist=False)