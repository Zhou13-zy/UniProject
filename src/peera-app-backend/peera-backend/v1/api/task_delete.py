# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g
import sqlite3

from . import Resource, db_helpers
from .. import schemas
    
DATABASE = "../../database.db"

class TaskDelete(Resource):

    def put(self):
        '''Delete task with taskID'''

        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()        

        # remove task from db
        task_id = str(g.args["taskId"])
        query = '''DELETE FROM tasks
                   WHERE task_id = ?
                   '''
        try:
            cursor.execute(query, task_id)
            # if task_id does not exist
            if cursor.rowcount == 0:
                raise Exception
            # commit changes
            con.commit()
        except Exception as e:
            response = {
                "api_response": {
                    "code": 400,
                    "message": "Error! Specified Task Not Found"
                }
            }
            return response, 400, None

        # append api status
        response = {
            "api_response": {
                "code": 200,
                "message": "OK"
            }
        }        

        # return the thing
        return response, 200, None