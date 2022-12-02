# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource, db_helpers
from .. import schemas

import datetime

DATABASE = "../../database.db"

class UserValidateToken(Resource):

    def put(self):
        '''Validate a user's token'''

        #get API arguments 
        print(g.args)
        input_token = g.args["token"]

        # db connect 
        con = db_helpers.newTokenConnection(DATABASE)
        cursor = con.cursor()
        
        ## check if token supplied exists 
        try:
            cursor.execute('''
            SELECT tok.user_id, tok.token, u.first_name, u.last_name, u.email_address, created_time, updated_time, u.capacity
            FROM auth_tokens tok 
            JOIN users u ON tok.user_id = u.user_id
            WHERE cast(tok.token as text) LIKE ?
            ORDER BY created_time DESC''', (str(input_token),))
            fetch_token = cursor.fetchall()
        except: 
            print(e)
            print("error running the select command") 
            response = {
                "api_response": {
                    "code": 400,
                    "message": "Error! Invalid"
                }
            }
            cursor.close()
            return response, 400, None


        if fetch_token:
            # check if token used in the last 15 mins (if user has not been inactive for the last 15 mins) 
            if fetch_token[0][6] > (datetime.datetime.now() + datetime.timedelta(minutes = -15)):
                # when token is valid and active within the last 15 mins 
                #update updated_time 
                query = ''' UPDATE auth_tokens 
                SET updated_time = ? 
                WHERE token = ?'''
                try:
                    cursor.execute(query, (datetime.datetime.now(), input_token))
                    con.commit()
                except Exception as e:
                    print(e)
                    print("error2")     
                response = {
                    "userId": fetch_token[0][0],
                    "firstName": fetch_token[0][2],
                    "lastName": fetch_token[0][3],
                    "email": fetch_token[0][4],
                    "capacity": fetch_token[0][7],
                    "token": fetch_token[0][1] 
                }
                response["api_response"] = {
                    "code": 201,
                    "message": "Success!"
                }
                cursor.close()
                return response, 201, None 

            else: 
                # if token/user has been inactive, delete token 
                cursor.execute('DELETE FROM auth_tokens WHERE token = ?', (input_token,))
                con.commit()
                
                response = {
                "api_response": {
                    "code": 400,
                    "message": "Error! Invalid"
                    }
                }
                cursor.close()
                return response, 400, None
        else:
            print("token not found") 
            response = {
                "api_response": {
                    "code": 400,
                    "message": "Error! Invalid"
                }
            }
            cursor.close()
            return response, 400, None
