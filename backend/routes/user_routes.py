from datetime import date as dt
from flask import Blueprint, request, jsonify
from models import db, User, Period, Mood

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Missing JSON data'}), 400
    required_fields = ['username', 'email', 'password', 'has_periods']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({'error': f"Missing fields: {', '.join(missing_fields)}"}), 400
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=data['password'],
        has_periods=data['has_periods']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message':'User registered successfully'}), 201

@user_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400
    
    user = User.query.filter_by(username=username, password=password).first()

    if user:
        return jsonify({'message': 'Login successful', 'username': user.username}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401
    
@user_routes.route('/user-data', methods=['GET'])
def get_user_data():
    username = request.args.get('username')
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    if user.has_periods:
        target = user
    elif user.partner and user.partner.has_periods:
        target = user.partner
    else:
        return jsonify({'message': 'No data available'}), 200
    today_mood = Mood.query.filter_by(user_username=target.username, date=dt.today()).first()
    last_period = (
        Period.query
        .filter_by(user_username=target.username, had_period=True)
        .order_by(Period.date.desc())
        .first()
    )
    data = {
        'username': target.username,
        'email': target.email,
        'preferences': {
            'sweet': target.preference.sweet if target.preference else None,
            'salty': target.preference.salty if target.preference else None,
            'cold': target.preference.cold if target.preference else None,
            'hot': target.preference.hot if target.preference else None,
            'product': target.preference.product if target.preference else None,
            'love_lang': target.preference.love_lang if target.preference else None,
            'msg': target.preference.msg if target.preference else None
        },
        'mood': today_mood.mood if today_mood else None,
        'last_period': last_period.date if last_period else None,
        'partner': target.partner.username if target.partner else None
    }
    return jsonify(data), 200

@user_routes.route('/last-period', methods=['GET'])
def get_last_period():
    username = request.args.get('username')
    if not username:
        return jsonify({'error': "Username is required"}), 400
    
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    if not user.has_periods:
        return jsonify({'error': 'This user does not track periods'}), 400
    
    last_period = (
        Period.query
        .filter_by(user_username=username, had_period=True)
        .order_by(Period.date.desc())
        .first()
    )

    if last_period:
        return jsonify({
            'last_period_date': last_period.date.isoformat()
        }), 200
    else:
        return jsonify({'message': 'No period data found'}), 404