from datetime import date as dt
from flask import Blueprint, request, jsonify
from models import db, User, Period, Mood, Preferences

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
        return jsonify({'username': user.username, 'has_periods': user.has_periods}), 200
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

@user_routes.route('/partner', methods=['GET', 'POST'])
def partner():    
    if request.method == 'GET':
        return get_partner()
    elif request.method == 'POST':
        return set_partner()

def set_partner(): # POST
    data = request.get_json()
    username = data.get('username')
    partner_username = data.get('partner_username')

    if not username or not partner_username:
        return jsonify({'error': 'Both usernames required'}), 400
    user = User.query.filter_by(username=username).first()
    partner = User.query.filter_by(username=partner_username).first()
    if not user or not partner:
        return jsonify({'error': 'One or both users not found'}), 404
    
    try:
        user.partner_username = partner_username
        partner.partner_username = username
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to set partner'}), 500


    return jsonify({'message': 'Partner set successfully'}), 200

def get_partner(): # GET
    username = request.args.get('username')
    if not username:
        return jsonify({'error': 'Username is required'}), 400
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    if not user.partner_username:
        return jsonify({'error': 'Partner not found'}), 404
    
    data = user.partner_username
    return jsonify({'partner_username': user.partner_username}), 200

@user_routes.route('/breakup', methods=['POST'])
def remove_partner():
    data = request.get_json()
    username = data.get('username')

    if not username:
        return jsonify({'error': 'Username required'}), 400

    user = User.query.filter_by(username=username).first()
    if not user or not user.partner_username:
        return jsonify({'error': 'User or partner not found'}), 404

    partner_username = user.partner_username
    partner = User.query.filter_by(username=partner_username).first()

    try:
        user.partner_username = None
        if partner:
            partner.partner_username = None
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to remove partner'}), 500

    return jsonify({'message': 'Partner removed'}), 200



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
    
@user_routes.route('/period', methods=['POST'])
def submit_period():
    data = request.get_json()
    username = data.get('username')
    
    if not username:
        return jsonify({'error': 'Username is required'}), 400
    
    user = User.query.filter_by(username=username).first()
    if not user or not user.has_periods:
        return jsonify({'error': 'User not found or doesn\'t track periods'}), 404
    
    new_period = Period(user_username=username, date=dt.today(), had_period=True)
    db.session.add(new_period)
    db.session.commit()

    return jsonify({'message': 'Period logged'}), 201

@user_routes.route('/mood', methods = ['GET', 'POST'])
def mood():
    if request.method == 'GET':
        return get_mood()
    elif request.method == 'POST':
        return set_mood()
    
def get_mood(): # GET
    username = request.args.get('username')
    if not username:
        return jsonify({'error': 'Username is required'}), 400
    
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    mood = Mood.query.filter_by(user_username=username, date=dt.today()).first()
    return jsonify({'mood': mood.mood if mood else None}), 200

def set_mood(): # POST
    data = request.get_json()
    username = data.get('username')
    mood = data.get('mood')

    if not username:
        return jsonify({'error': 'Username is required'}), 400
    
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'Username is required'}), 400
    
    prev_mood = Mood.query.filter_by(user_username=username, date=dt.today()).first()
    if prev_mood:
        prev_mood.mood = mood
    else:
        new_mood = Mood(user_username=username, date=dt.today(), mood=mood)
        db.session.add(new_mood)

    db.session.commit()
    return jsonify({'message': 'Mood saved'}), 200

@user_routes.route('/cravings', methods = ['GET', 'POST'])
def cravings():
    if request.method == 'GET':
        return get_cravings()
    elif request.method == 'POST':
        return set_cravings()
    
def get_cravings(): # GET
    username = request.args.get('username')
    if not username:
        return jsonify({'error': 'Username is required'}), 400
    
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    craving = Mood.query.filter_by(user_username=username, date=dt.today()).first()
    return jsonify({'cravings': craving.cravings if craving else None}), 200

def set_cravings(): # POST
    data = request.get_json()
    username = data.get('username')
    craving = data.get('cravings')

    if not username:
        return jsonify({'error': 'Username is required'}), 400
    
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'Username is required'}), 400
    
    prev_craving = Mood.query.filter_by(user_username=username, date=dt.today()).first()
    if prev_craving:
        prev_craving.cravings = craving
    else:
        new_craving = Mood(user_username=username, date=dt.today(), cravings=craving)
        db.session.add(new_craving)

    db.session.commit()
    return jsonify({'message': 'Mood saved'}), 200

@user_routes.route('/symptoms', methods=['GET', 'POST'])
def symptoms():
    if request.method == 'GET':
        return get_symptoms()
    elif request.method == 'POST':
        return set_symptoms()
    
def get_symptoms():  # GET
    username = request.args.get('username')
    if not username:
        return jsonify({'error': 'Username is required'}), 400
    
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    mood_entry = Mood.query.filter_by(user_username=username, date=dt.today()).first()
    return jsonify({'symptoms': mood_entry.symptoms if mood_entry else None}), 200

def set_symptoms():  # POST
    data = request.get_json()
    username = data.get('username')
    symptoms = data.get('symptoms')

    if not username:
        return jsonify({'error': 'Username is required'}), 400
    
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    prev_entry = Mood.query.filter_by(user_username=username, date=dt.today()).first()
    if prev_entry:
        prev_entry.symptoms = symptoms
    else:
        new_entry = Mood(user_username=username, date=dt.today(), symptoms=symptoms)
        db.session.add(new_entry)

    db.session.commit()
    return jsonify({'message': 'Symptoms saved'}), 200

@user_routes.route('/preferences', methods = ['GET', 'POST'])
def preferences():
    if request.method == 'GET':
        return get_preferences()
    elif request.method == 'POST':
        return set_preferences()
    
def get_preferences(): # GET
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

    preferences = Preferences.query.filter_by(user_username=target.username).first()
    if not preferences:
        return jsonify({'preferences': None}), 200
    
    data = {
        'sweet': target.preference.sweet if target.preference else None,
        'salty': target.preference.salty if target.preference else None,
        'cold': target.preference.cold if target.preference else None,
        'hot': target.preference.hot if target.preference else None,
        'product': target.preference.product if target.preference else None,
        'love_lang': target.preference.love_lang if target.preference else None,
        'msg': target.preference.msg if target.preference else None
    }

    return jsonify({'preferences': data}), 200


def set_preferences(): #POST
    data = request.get_json()
    username = data.get('username')
    if not username:
        return jsonify({'error': 'Username is required'}), 400

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    preferences = Preferences.query.filter_by(user_username=username).first()
    if not preferences:
        preferences = Preferences(user_username=username)
        db.session.add(preferences)
    
    for field in ['sweet', 'salty', 'cold', 'hot', 'product', 'love_lang', 'msg']:
        if field in data:
            setattr(preferences, field, data[field])

    db.session.commit()
    return jsonify({'message': 'Preferences saved'}), 200

@user_routes.route('/today', methods=['GET'])
def get_today():
    today = dt.today()
    return jsonify({'date': today.isoformat()}), 200

@user_routes.route('/has-periods', methods=['GET'])
def has_periods():
    username = request.args.get('username')
    if not username:
        return jsonify({'error': 'Username required'}), 400

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({'has_periods': user.has_periods}), 200