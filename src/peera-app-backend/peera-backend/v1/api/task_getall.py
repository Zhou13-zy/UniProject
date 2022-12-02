# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function
import sqlite3
from flask import request, g

from . import Resource, db_helpers
from .. import schemas

DATABASE = "../../database.db"

class TaskGetall(Resource):

    def get(self):
        '''Get all tasks matching any combination of supplied userID/projectID'''

        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()

        # run sql query according to supplied args
        if "userId" in g.args and "projectId" in g.args:
            query = '''SELECT * FROM TASKS
                WHERE project_id = ? AND assigned_to = ?'''
            cursor.execute(query, (str(g.args["projectId"]), str(g.args["userId"])))
        
        elif "projectId" in g.args:
            query = '''SELECT * FROM TASKS
                WHERE project_id = ?'''
            cursor.execute(query, (str(g.args["projectId"]),))
        
        elif "userId" in g.args:
            query = '''SELECT * FROM TASKS
                WHERE assigned_to = ?'''
            cursor.execute(query, (str(g.args["userId"]),))

        # check response is ok
        try:
            task_info = list((cursor.fetchall()))
            # return error if no matching tasks found
            if len(task_info) < 1:
                raise IndexError
        except IndexError:
            response = {
                "api_response": {
                    "code": 404,
                    "message": "Error! Not Found"
                }
            }
            return response, 404, None
        
        # convert reponse to list of dicts
        result = []
        for task in task_info: 
            result.append({key:val for key, val in zip(["taskId", "projectId", "title", "summary", "status", "createdBy", "assignedTo", "dueDate", "createdTime", "updatedTime", "effort"], task)})

        # return the thing
        return result, 200, None