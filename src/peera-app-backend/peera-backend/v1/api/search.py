# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g
import sqlite3

from . import Resource, db_helpers
from .. import schemas

def newConnection(db):
    con = None
    try:
        con = sqlite3.connect(db)
    except Exception as e:
        print(e)
    
    return con

DATABASE = "../../database.db"

class Search(Resource):

    def get(self):
        '''
        Search for:
        - tasks with matching summary, task_id, due_date
        - users with matching email, first/last name
        '''

        # todo check that id is valid

        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()
        
        userQuery = '''SELECT * FROM users
            WHERE email_address LIKE ? OR first_name LIKE ? OR last_name LIKE ?'''
        taskQuery = '''SELECT * FROM tasks
            WHERE title LIKE ? OR summary LIKE ? OR task_id LIKE ? OR due_date LIKE ?'''

        # query db for users and tasksstuff
        result = {"users": [], "tasks": []}
        try:
            # fetch matching users
            cursor.execute(userQuery, ('%{}%'.format(str(g.args["search"])),'%{}%'.format(str(g.args["search"])),'%{}%'.format(str(g.args["search"]))))
            userMatches = list(cursor.fetchall())
            
            # fetch matching tasks
            cursor.execute(taskQuery, ('%{}%'.format(str(g.args["search"])),'%{}%'.format(str(g.args["search"])), '%{}%'.format(str(g.args["search"])), '%{}%'.format(str(g.args["search"]))))
            taskMatches = list(cursor.fetchall())
            
            # return error if no matching tasks found
            if len(userMatches) < 1 and len(taskMatches) < 1:
                 raise IndexError
        except IndexError:
            response = {
                "api_response": {
                    "code": 404,
                    "message": "Error! Not Found"
                }
            }
            return response, 404, None
        
        # grab lengths of each response
        result["numUsers"] = len(userMatches)
        result["numTasks"] = len(taskMatches)

        # convert reponse to list of dicts
        for task in taskMatches: 
            result["tasks"].append({key:val for key, val in zip(["taskId", "projectId", "title", "summary", "status", "createdBy", "assignedTo", "dueDate", "createdTime", "updatedTime"], task)})

        for user in userMatches: 
            result["users"].append({key:val for key, val in zip(["userId", "email", "password", "firstName", "lastName","capacity"], user)})

        # return the thing

        return result, 200, None