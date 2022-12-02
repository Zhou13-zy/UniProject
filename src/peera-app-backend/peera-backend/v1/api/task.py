# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function
import sqlite3

from flask import request, g
from json import dumps

from . import Resource, db_helpers
from .. import schemas

DATABASE = "../../database.db"

class Task(Resource):

    def get(self):
        '''Fetch a task with taskID'''

        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()
        
        # get all the info
        task_id = str(g.args["taskId"])
        cursor.execute("SELECT * FROM TASKS WHERE task_id = ?", (task_id,))
        
        # check response is ok
        try:
            task_info = list((cursor.fetchall())[0])
        except IndexError:
            response = {
                "api_response": {
                    "code": 404,
                    "message": "Error! Not Found"
                }
            }
            return response, 404, None
        
        # convert reponse to dict
        d = {key:val for key, val in zip(["taskId", "projectId", "title", "summary", "status", "createdBy", "assignedTo", "dueDate", "createdTime", "updatedTime", "effort"], task_info)}
        
        # append api status
        d["api_response"] = {
            "code": 200,
            "message": "OK"
        }

        # return the thing
        return d, 200, None

    def post(self):
        # todo check validity of inputs

        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()
        
        # add new task to db
        query = '''INSERT INTO tasks(task_id, project_id, title, summary, status, created_by, assigned_to, due_date, created_time, updated_time, effort)
                   VALUES (null,?,?,?,?,?,?,?,?,?, ?)'''
        vals = list(g.json.values())

        try:
            cursor.execute(query, (vals[1], vals[2], vals[3], vals[4], vals[5], vals[6], vals[7], vals[8], vals[9], vals[10]))
            con.commit()
        except Exception as e:
            print("ERROR!")
            response = {
                "code": 400,
                "message": "Error! Invalid"
            }
            return response, 400, None
        
        # return the thing      
        response = dict(g.json)
        # append api status
        response["api_response"] = {
            "code": 201,
            "message": "Success! Created"
        }
        return response, 201, None

    def put(self):
        #print(g.json)
        #print(g.args)

        # check validity of inputs


        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()
        
        # find task to update
        task_id = g.args["taskId"]

        # add new task to db
        query = '''UPDATE tasks
                   SET project_id = ?, title = ?, summary = ?, status = ?, created_by = ?, assigned_to = ?, due_date = ?, updated_time = ?, effort = ?
                   WHERE task_id = ?
                   '''
        try:
            vals = list(g.json.values())
            print(vals)
            cursor.execute(query, (vals[1], vals[2], vals[3], vals[4], vals[5], vals[6], vals[7], vals[9], vals[10], task_id))
            # if we didn't find a match for the taskid
            if cursor.rowcount < 1:
                raise IndexError
            con.commit()
        except IndexError:
            response = {
                "api_response": {
                    "code": 400,
                    "message": "Error! Invalid"
                }
            }
            return response, 404, None

        # return the thing      
        response = {"id": task_id} # todo more fields needed for this to 
        response["api_response"] = {
            "code": 200,
            "message": "OK"
        }

        return response, 200, None

    def delete(self):
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()        

        # remove task from db
        task_id = str(g.args["taskId"])
        query = '''DELETE FROM tasks
                   WHERE task_id = ?
                   '''
        try:
            cursor.execute(query, (task_id,))
            # if task_id does not exist
            if cursor.rowcount == 0:
                raise Exception
            # commit changes
            con.commit()
        except Exception as e:
            response = {
                "api_response": {
                    "code": 404,
                    "message": "Error! Specified Task Not Found"
                }
            }
            return response, 404, None

        # append api status
        response = {
            "api_response": {
                "code": 200,
                "message": "OK"
            }
        }        

        # return the thing
        return response, 200, None
