# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource, db_helpers
from .. import schemas

from json import dumps


DATABASE = "../../database.db"


class Connection(Resource):

    def get(self):
        '''Fetch a user connection'''
        print(g.args)
        
        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()

        # get arguments
        user_id = str(g.args["userId"])

        # if connected user id is supplied, check connection between two or fetch all connections for a user 

        if len(g.args) > 1:
            #check whether the two users are connected 

            #get argument for connected_user_id 
            connected_user_id = str(g.args["connectedUserId"])
            #query for the two specified users
            query = '''SELECT c.user_id, c.connected_user_id, u.first_name, u.last_name, u.email_address
                        FROM connections c 
                        JOIN users u on c.connected_user_id = u.user_id
                        WHERE c.user_id = ?
                        AND c.connected_user_id = ?'''
            
            try:
                cursor.execute(query, (user_id, connected_user_id))
                con.commit()
                fetch_connections = cursor.fetchall()
            except Exception as e:
                print(e)
                response = {
                    "code": 404,
                    "message": "Error! Invalid"
                }
                cursor.close()
                return response, 404, None

            #convert list of results into json response

            response = []
            for x in fetch_connections:
                response.append({key:val for key, val in zip(["userId", "connectedUserId", "firstName", "lastName", "emailAddress"], x)})
            
            cursor.close()
            return response, 200, None

        else: 
            #fetch all connections for a user

            #query for getting all connections for a user
            query = '''SELECT c.user_id, c.connected_user_id, u.first_name, u.last_name, u.email_address
                        FROM connections c 
                        JOIN users u on c.connected_user_id = u.user_id
                        WHERE c.user_id = ?'''
            
            try:
                cursor.execute(query, (user_id,))
                con.commit()
                fetch_connections = cursor.fetchall()
            except Exception as e:
                print(e)
                response = {
                    "code": 404,
                    "message": "Error! Invalid"
                }
                cursor.close()
                return response, 404, None
            
            #convert list of results into json response

            response = []
            for x in fetch_connections:
                response.append({key:val for key, val in zip(["userId", "connectedUserId", "firstName", "lastName", "emailAddress"], x)})
            
            cursor.close()
            return response, 200, None

    def delete(self):
        '''Delete a user connection'''
        print(g.args)

        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()

        # get arguments
        user_id = str(g.args["userId"])
        connected_user_id = str(g.args["connectedUserId"])

        # delete connection from db
        query = '''DELETE FROM connections
                   WHERE user_id in (?,?)
                   AND connected_user_id in (?,?) '''
        
        try:
            # run db query
            cursor.execute(query, (user_id, connected_user_id, user_id, connected_user_id))
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
    
