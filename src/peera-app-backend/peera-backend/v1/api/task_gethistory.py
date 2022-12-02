# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource, db_helpers
from .. import schemas
import sqlite3

DATABASE = "../../database.db"

def newConnection(db):
    con = None
    try:
        con = sqlite3.connect(db)
    except Exception as e:
        print(e)
    return con

class TaskGethistory(Resource):

    def get(self):
        '''Fetch all past states of a task with taskID'''
        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()

        # build sql query
        membersQuery = '''SELECT * FROM task_log
            WHERE task_id = ?'''
    
        try:
            # run query
            cursor.execute(membersQuery, (str(g.args["taskId"]),))
            task_logs = list((cursor.fetchall()))
            # return error if no matching projects found
            con.commit()
            if len(task_logs) < 1:
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
        for log in task_logs: 
            result.append({key:val for key, val in zip(["taskId", "ProjectId", "newProjectId", "title", "newTitle", "summary", "newSummary", "status", "newStatus", "assignedTo", "newAssignedTo", "dueDate", "newDueDate", "updatedTime", "effort", "newEffort"], log)})
        
        # return the thing
        return result, 200, None