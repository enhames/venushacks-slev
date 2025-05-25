from flask import Blueprint, request, jsonify
from models import db, User, Period

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
        .filter_by(user_username=username, has_periods=True)
        .order_by(Period.date.desc())
        .first()
    )

    if last_period:
        return jsonify({
            'last_period_date': last_period.date.isoformat()
        }), 200
    else:
        return jsonify({'message': 'No period data found'}), 404