# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource, db_helpers
from .. import schemas

import sqlite3

DATABASE = "../../database.db"

class Taskcomment(Resource):

    def get(self):
        '''Get comments for a given task'''

        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()
        
        # get all the info
        task_id = str(g.args["taskId"])
        cursor.execute("SELECT * FROM task_comments WHERE task_id = ?", (task_id,))
        
        # check response is ok
        try:
            comments = list((cursor.fetchall()))
            if len(comments) < 1:
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
        for comment in comments: 
            result.append({key:val for key, val in zip(["commentId", "taskId", "commentText", "commentBy"], comment)})

        return result, 200, None

    def post(self):
        '''Create new comment'''
        
        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()
        
        # add new task comment to db
        query = '''INSERT INTO task_comments(comment_id, task_id, comment_text, comment_by)
                   VALUES (null,?,?,?)'''
        vals = list(g.json.values())

        try:
            cursor.execute(query, (vals[1], vals[2], vals[3]))
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
        # append links and api status
        response["api_response"] = {
            "code": 201,
            "message": "OK"
        }
        return response, 201, None

    def put(self):
        '''Update existing task comment'''

        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()
        
        # find task to update
        query = '''UPDATE task_comments
                   SET comment_text = ?, comment_by = ?
                   WHERE comment_id = ? AND task_id = ?
                   '''
        try:
            vals = list(g.json.values())
            cursor.execute(query, (vals[2], vals[3], vals[0], vals[1]))
            
            # if we didn't find a match for the taskid and commentid
            if cursor.rowcount < 1:
                raise IndexError
            con.commit()
        except IndexError:
            response = {
                "api_response": {
                    "code": 405,
                    "message": "Error! Invalid"
                }
            }
            return response, 405, None

        # return the thing
        response = {} 
        response["api_response"] = {
            "code": 200,
            "message": "OK"
        }

        return response, 200, None


    def delete(self):
        '''Delete a task comment'''

        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()        

        # remove comment from db
        task_id = g.args["taskId"]
        comment_id = g.args["commentId"]

        query = '''DELETE FROM task_comments
                   WHERE task_id = ? AND comment_id = ?
                   '''
        try:
            cursor.execute(query, (task_id, comment_id))
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
