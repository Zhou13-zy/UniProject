# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource, db_helpers
from .. import schemas
from .auth import hash

import datetime
import jwt

DATABASE = "../../database.db"

def newToken(u_id):
    # '''Generates token using jwt, containing u_id'''
    return jwt.encode({'u_id': u_id}, 'ilikecats', algorithm='HS256')

#API 

class UserLogin(Resource):

    def post(self):
        '''Authenticate a user given name and password, creat a login token'''

        # get API arguments
        print(g.args)
        user = g.args 
        username = user["username"]

        # db connect 
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()
        
        ## check if password supplied is correct 

        cursor.execute('SELECT * FROM users WHERE email_address = ?', (username,))
        fetch_user = cursor.fetchone()
        if fetch_user:
            if fetch_user[2] == hash(user["password"]):
               # if password provided is correct 

               #delete old tokens 
               cursor.execute('DELETE FROM auth_tokens WHERE user_id = ?', (fetch_user[0],))
               con.commit()
        
               # create new token 
               token  = newToken(user["username"])
               
               #commit new token to DB 
               query_newtoken = '''INSERT INTO auth_tokens(user_id, token, created_time, updated_time)
               VALUES(?,?,?,?)'''
               try:
                cursor.execute(query_newtoken, (fetch_user[0], token, datetime.datetime.now(), datetime.datetime.now()))
                con.commit()
               except Exception as e:
                print(e)    
                
               cursor.close()
               
               response = {
                "userId": fetch_user[0],
                "firstName": fetch_user[3],
                "lastName": fetch_user[4],
                "email": fetch_user[1],
                "capacity": fetch_user[5],
                "token": token 
               }
               cursor.close()
               return response, 201, None 
            else:
                cursor.close()
                return {}, 400, None
        else:
            cursor.close()
            return {}, 400, None