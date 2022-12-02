# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource, db_helpers
from .. import schemas

import sqlite3
from datetime import datetime


DATABASE = "../../database.db"

class Project(Resource):
    def get(self):
        '''Fetch a project with matching projectID'''
        
        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()
        
        # get all the info
        project_id = str(g.args["projectId"])
        cursor.execute("SELECT * FROM projects WHERE project_id = ?", (project_id,))
        
        # check response is ok
        try:
            project_info = list((cursor.fetchall())[0])
        except IndexError:
            response = {
                "api_response": {
                    "code": 404,
                    "message": "Error! Not Found"
                }
            }
            return response, 404, None
        
        # convert reponse to dict
        d = {key:val for key, val in zip(["projectId", "projectName", "projectDescription", "projectOwner", "createdTime"], project_info)}
        
        # api status

        d["api_response"] = {
            "code": 200,
            "message": "OK"
        }

        # return the thing
        return d, 200, None

    def post(self):
        '''Add a new project'''

        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()
        
        # add new project to db
        query = '''INSERT INTO projects (project_id, project_name, project_description, project_owner, created_time)
                   VALUES (null,?,?,?,?)'''
        getQuery = '''SELECT * FROM projects WHERE project_name = ? AND project_owner = ? ORDER BY created_time DESC'''
        vals = list(g.json.values())

        try:
            cursor.execute(query, (str(vals[1]), str(vals[2]), str(vals[3]), str(datetime.now())))
            con.commit()
        except Exception as e:
            print(f"ERROR! {e}")
            response = {
                "code": 400,
                "message": "Error! Invalid"
            }
            return response, 400, None
        
        # query db for project ID
        try:
            cursor.execute(getQuery, (str(vals[1]), str(vals[3])))
            project_id = cursor.fetchall()
        except Exception as e:
            print(f"ERROR! {e}")
            response = {
                "code": 400,
                "message": "Error! Invalid"
            }
            return response, 400, None

        # add owner to project members
        updateMemberQuery = "INSERT INTO project_members (project_id, user_id, role) SELECT ?,?, 'default'"

        try:
            cursor.execute(updateMemberQuery,  (str(project_id[0][0]), vals[3]))
            con.commit()
        except Exception as e:
            print(f"ERROR! {e}")
            response = {
                "code": 400,
                "message": "Error! Invalid"
            }
            return response, 400, None

        # return the thing      
        response = {key:val for key, val in zip(["projectId", "projectName", "projectDescription", "projectOwner", "createdTime"], project_id[0])}
        # append api status
        response["api_response"] = {
            "code": 201,
            "message": "Success! Created"
        }
        return response, 201, None

    def put(self):
        '''Update an existing project matching projectID'''

        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()
        
        # find project to update
        project_id = g.args["projectId"]

        # edit project in db
        query = '''UPDATE projects
                   SET project_name = ?, project_description = ?, project_owner = ?
                   WHERE project_id = ?
                   '''
        try:
            vals = list(g.json.values())
            cursor.execute(query, (vals[1], vals[2], vals[3], project_id))
            # if we didn't find a match for the projectid
            if cursor.rowcount < 1:
                raise IndexError
            con.commit()
        except IndexError:
            print("index error")
            response = {
                "api_response": {
                    "code": 405,
                    "message": "Error! Invalid"
                }
            }
            return response, 405, None

        # return the thing      
        response = {"id": project_id} # todo more fields needed for this to 
        response["api_response"] = {
            "code": 200,
            "message": "OK"
        }

        return response, 200, None

    def delete(self):
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()        

        # remove project from db
        project_id = str(g.args["projectId"])
        query_project = '''DELETE FROM projects
                   WHERE project_id = ?
                   '''
        query_task = ''' DELETE FROM tasks WHERE project_id = ? '''
        query_members = ''' DELETE FROM project_members WHERE project_id = ? '''
        
        # delete project 
        try:
            cursor.execute(query_project, (project_id,))
            # if project_id does not exist
            if cursor.rowcount == 0:
                raise Exception
            # commit changes
            con.commit()
        except Exception as e:
            response = {
                "api_response": {
                    "code": 404,
                    "message": "Error! Specified project Not Found"
                }
            }
            return response, 404, None
        
        # delete tasks 
        try:
            cursor.execute(query_task, (project_id,))
            # if project_id does not exist
            if cursor.rowcount == 0:
                raise Exception
            # commit changes
            con.commit()
        except Exception as e:
            response = {
                "api_response": {
                    "code": 404,
                    "message": "Error! Specified project Not Found"
                }
            }
            return response, 404, None

        # delete project members 
        try:
            cursor.execute(query_members, (project_id,))
            # if project_id does not exist
            if cursor.rowcount == 0:
                raise Exception
            # commit changes
            con.commit()
        except Exception as e:
            response = {
                "api_response": {
                    "code": 404,
                    "message": "Error! Specified project Not Found"
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
