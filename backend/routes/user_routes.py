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