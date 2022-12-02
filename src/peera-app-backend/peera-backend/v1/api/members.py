# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource, db_helpers
from .. import schemas

import sqlite3
from json import dumps


DATABASE = "../../database.db"

class Members(Resource):

    def get(self):
        '''Fetch project members'''
        print(g.args)

        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()
        
        # get arguments
        project_id = str(g.args["projectId"])

        # fetch all members from the db 
        query = '''select m.project_id, m.user_id, m.role, p.project_name, p.project_description, u.first_name, u.last_name, u.email_address, u.capacity 
                    from project_members m
                    join projects p on m.PROJECT_ID = p.project_id
                    join users u on m.user_id = u.user_id
                    where m.project_id = ?'''

        cursor.execute(query, (project_id,))
        
        try:
            fetch_members = cursor.fetchall()
            # return error if no matching members found
            if len(fetch_members) < 1:
                raise IndexError
        except IndexError:
            response = {
                "api_response": {
                    "code": 404,
                    "message": "Error! Not Found"
                }
            }
            cursor.close()
            return response, 404, None
        

        # convert members list to json 
        response = []

        for x in fetch_members:
            response.append({key:val for key, val in zip(["projectId", "userId", "role", "projectName", "projectDescription", "firstName", "lastName", "emailAddress", "capacity"], x)})

        cursor.close()
        return response, 200, None

    def post(self):
        '''Add a user to be a project member'''
        print(g.args)

        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()

        # get arguments
        project_id = str(g.args["projectId"])
        user_id = str(g.args["userId"])
        role = str(g.args["role"])

        # define db query
        query = '''INSERT INTO project_members(project_id, user_id, role)
                   VALUES (?,?,?)'''
        
        # add new project member to db
        try:
            cursor.execute(query, (project_id, user_id, role))
            con.commit()
        except Exception as e:
            print("ERROR!")
            response = {
                "code": 400,
                "message": "Error! Invalid"
            }
            cursor.close()
            return response, 400, None
        
        #return new member from db
        query_return = '''select m.project_id, m.user_id, m.role, p.project_name, p.project_description, u.first_name, u.last_name, u.email_address, u.capacity 
                        from project_members m
                        join projects p on m.PROJECT_ID = p.project_id
                        join users u on m.user_id = u.user_id
                        where m.project_id = ?
                        and m.user_id = ? '''       
        
        cursor.execute(query_return, (project_id, user_id))
        
        try:
            fetch_members = cursor.fetchone()
            # return error if no matching members found
            if len(fetch_members) < 1:
                raise IndexError
        except IndexError:
            response = {
                "api_response": {
                    "code": 400,
                    "message": "Error! Not Found"
                }
            }
            cursor.close()
            return response, 400, None

        # return the new added member       
        
        response =  {key:val for key, val in zip(["projectId", "userId", "role", "projectName", "projectDescription", "firstName", "lastName", "emailAddress", "capacity"], fetch_members)}
        
        # append api status
        
        response["api_response"] = {
            "code": 201,
            "message": "Added Member to Project"
        }
        cursor.close()
        return response, 201, None

    def delete(self):
        '''Remove a project member'''
        print(g.args)

        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()

        # get arguments
        project_id = str(g.args["projectId"])
        user_id = str(g.args["userId"])

        # delete project member from db
        query = '''DELETE FROM project_members
                   WHERE project_id = ?
                   AND user_id = ?'''
        
        try:
            cursor.execute(query, (project_id, user_id))
            con.commit()
        except Exception as e:
            print(e)
            response = {
                "code": 404,
                "message": "Error! Invalid"
            }
            cursor.close()
            return response, 404, None
        
        response = {
            "api_response": {
                "code": 200,
                "message": "OK"
            }
        }        

        cursor.close()
        return response, 200, None