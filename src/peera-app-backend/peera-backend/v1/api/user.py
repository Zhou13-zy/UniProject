# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource, db_helpers
from .. import schemas


DATABASE = "../../database.db"

class User(Resource):

    def get(self):
        '''Fetch a user with userID'''

        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()
        
        # get all the info
        user_id = str(g.args["userId"])
        cursor.execute("SELECT * FROM users WHERE user_id = ?", (user_id,))
        
        # check response is ok
        try:
            user_info = list((cursor.fetchall())[0])
        except IndexError:
            response = {
                "api_response": {
                    "code": 404,
                    "message": "Error! Not Found"
                }
            }
            return response, 404, None
        
        # convert reponse to dict
        d = {key:val for key, val in zip(["userId", "email", "password", "firstName", "lastName", "capacity"], user_info)}

        d["api_response"] = {
            "code": 200,
            "message": "OK"
        }

        # return the thing
        return d, 200, None