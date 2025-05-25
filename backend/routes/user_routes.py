from flask import Blueprint, request, jsonify
from models import db, User

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
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