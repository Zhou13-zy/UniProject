# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource, db_helpers
from .. import schemas


import sqlite3
from json import dumps


#database connection
DATABASE = "../../database.db"


class Capacity(Resource):


    def put(self):
        '''Update a user's capacity'''
        print(g.args)

        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()

        # get arguments
        user_id = str(g.args["userId"])
        capacity = str(g.args["capacity"])
        
        # query to update user capacity 

        query_update = ''' UPDATE users 
                        SET capacity = ?
                        WHERE user_id = ? '''
                            
        # execute query to update user capacity 

        try:
            cursor.execute(query_update, (capacity,user_id))
            con.commit()                
        except Exception as e:
            print(e)
            response = {
                "api_response": {
                    "code": 405,
                    "message": "Error! Not Allowed"
                }
            }
            cursor.close()
            return response, 405, None


        # query to get udpated user info 

        query_get = ''' SELECT * FROM users WHERE user_id = ? '''

        # get updated user info from DB 

        try:
            cursor.execute(query_get, (user_id,))
            fetch_user= cursor.fetchone()
            # return error if no request found
        except Exception as e:
            print(e)
            response = {
                "api_response": {
                    "code": 405,
                    "message": "Error!"
                }
            }
            cursor.close()
            return response, 405, None
        # return updated user info including capacity
        
        response = {key:val for key, val in zip(["userId", "email", "password", "firstName", "lastName", "capacity"], fetch_user)}
        response["api_response"] = {
                "code": 200,
                "message": "Capacity updated to {} hours.".format(fetch_user[5])
            }
        cursor.close()
        return response, 200, None