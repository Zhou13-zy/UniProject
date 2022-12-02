import sys
import users
from json import dumps
from flask import Flask, request
from flask_cors import CORS


def basicErrorHandler(err):
    '''A dumb error handler'''
    response = err.get_response()
    print('response', err, err.get_response())
    response.data = dumps({
        "code": err.code,
        "name": "Error",
        "message": err.get_description(),
    })
    response.content_type = 'application/json'
    return response


APP = Flask(__name__)
CORS(APP)

APP.config['TRAP_HTTP_EXCEPTIONS'] = True
APP.register_error_handler(Exception, basicErrorHandler)

# AUTHENTICATION
# ______________

@APP.route('/login', methods=['POST'])
def auth_login():
    '''User login'''
    details = request.get_json()
    try:
        # get login token
        return dumps({'token': token})
    except:
        # generic error
        raise InputError(description='Login failed, please check your username and password')


@APP.route('/logout', methods=['POST'])
def auth_logout():
    '''User logout'''
    token = request.get_json()
    # logout func
    return dumps({out})

@APP.route('/register', methods=['POST'])
def auth_register():
    '''Register user'''
    details = request.get_json()
    # register user func
    return dumps({output})

# USERS
# ______________

def getUser()
    email = request.get_json() # should this be a uid?
    
    # find user matching that email/uid

        # if not found, error
 
    # return user

@APP.route('/profile', methods=['POST'])
def getProfile():
    requestedUser = request.get_json()
    
    user = getUser()

    # lookup details of user

    # return
    
    
