# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource, db_helpers
from .. import schemas

from json import dumps


DATABASE = "../../database.db"


class Workload(Resource):

    def get(self):
        '''Fetch a user's workload'''

        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()

        # get arguments
        user_id = str(g.args["userId"])

        # query to get users workload

        query = ''' SELECT u.user_id, (sum(t.effort)*100)/max(u.capacity) as workload 
                    FROM users u 
                    JOIN tasks t ON u.user_id = t.assigned_to 
                    WHERE t.status != 'Completed'
                    AND user_id = ? '''
                            
        # get user workload from DB  

        try:
            cursor.execute(query, (user_id,))
            fetch_workload= cursor.fetchone()
        except Exception as e:
            print(e)
            response = {
                "api_response": {
                    "code": 404,
                    "message": "No New Pending Connection Requests"
                }
            }
            cursor.close()
            return response, 404, None        

        #return user workload

        response = {"workload": fetch_workload[1] }
        response["api_response"] = {
                "code": 200,
                "message": "Workload for user is {}%.".format(fetch_workload[1])
            }
        cursor.close()
        return response, 200, None