# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource, db_helpers
from .. import schemas

#database connection

DATABASE = "../../database.db"


class UserLogout(Resource):

    def delete(self):
        '''Delete a login token'''

        #get API arguments 
        print(g.args)
        input_token = g.args["token"]

        # db connect 
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()
        
        # delete token from DB

        cursor.execute('DELETE FROM auth_tokens WHERE token = ?', (input_token,))
        con.commit()

        response = {
                "api_response": {
                    "code": 200,
                    "message": "OK"
                    }
                }
        cursor.close()
        return response, 200, None