# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource, db_helpers
from .. import schemas

import sqlite3
from json import dumps


#database connection

DATABASE = "../../database.db"

class Request(Resource):

    def get(self):
        '''Fetch all pending requests for a user'''

        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()

        # get arguments
        user_id = str(g.args["userId"])

        # get all pending connecetion requests for user 

        query = ''' SELECT r.request_id, r.request_from, r.request_to, r.status, u.first_name, u.last_name
                    FROM connection_requests r
                    JOIN users u on r.request_from = u.user_id
                    JOIN users u2 on r.request_to = u2.email_address
                    WHERE u2.user_id = ? 
                    AND status = 'pending' '''
        # query db 

        try:
            cursor.execute(query, (user_id,))
            fetch_requests= cursor.fetchall()
            # return error if existing request found
            if len(fetch_requests) < 1:
                raise IndexError
        except IndexError:
            response = {
                "api_response": {
                    "code": 404,
                    "message": "No New Pending Connection Requests"
                }
            }
            cursor.close()
            return response, 404, None
        
        #response for pending connection requests 
        response = []

        for x in fetch_requests:
            response.append({key:val for key, val in zip(["requestId", "requestFrom", "requestTo", "status", "firstName", "lastName"], x)})

        cursor.close()
        return response, 200, None

    def post(self):
        '''Create a new connection request '''

        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()

        # get arguments
        request_to = str(g.args["requestTo"])
        request_from = str(g.args["requestFrom"])

        # check if a pending connection request already exists 

        query_get = ''' SELECT r.request_id, r.request_from, r.request_to, r.status, u.first_name, u.last_name
                        FROM connection_requests r
                        JOIN users u on r.request_to = u.email_address
                        WHERE r.request_to = ? 
                        AND r.request_from = ?
                        AND status = 'pending' '''
        
        try:
            cursor.execute(query_get, (request_to,request_from))
            fetch_requests= cursor.fetchall()
            # return error if existing request found
            if len(fetch_requests) > 0:
                raise IndexError
        except IndexError:
            response = {
                "api_response": {
                    "code": 400,
                    "message": "Connection Request Already Sent"
                }
            }
            cursor.close()
            return response, 400, None

        # check if users are already connected 

        query_connected = ''' SELECT c.user_id, c.connected_user_id, u.first_name, u.last_name, u.email_address
                            FROM connections c 
                            JOIN users u on c.connected_user_id = u.user_id
                            WHERE c.user_id = ?
                            AND u.email_address = ?'''

        try:
            cursor.execute(query_connected, (request_from, request_to))
            fetch_requests= cursor.fetchall()
            # return error if existing connection found
            if len(fetch_requests) > 0:
                raise IndexError
        except IndexError:
            response = {
                "api_response": {
                    "code": 405,
                    "message": "User is already connected"
                }
            }
            cursor.close()
            return response, 405, None

        # no existing request and not already connected    

        # create new request 

        query = ''' INSERT INTO connection_requests(request_from, request_to, status)
                    select ?, ? , "pending"'''
        
        try:
            cursor.execute(query, (request_from, request_to))
            con.commit()
        except Exception as e:
            print("ERROR!")
            response = {
                "code": 400,
                "message": "Error! Invalid"
            }
            cursor.close()
            return response, 400, None


        # return new created request 
        
        try:
            cursor.execute(query_get, (request_to,request_from))
            fetch_requests= cursor.fetchall()
            # return error if no request found
            if len(fetch_requests) < 1:
                raise IndexError
        except IndexError:
            response = {
                "api_response": {
                    "code": 400,
                    "message": "Connection Request Already Sent"
                }
            }
            cursor.close()
            return response, 400, None
        
        # response for new created request 

        response = {key:val for key, val in zip(["requestId", "requestFrom", "requestTo", "status", "firstName", "lastName"], fetch_requests[0])}
        response["api_response"] = {
            "code": 201,
            "message": "Connection Request sent to {} {}".format(fetch_requests[0][4],fetch_requests[0][5])
        }
        cursor.close()
        return response, 201, None

    def put(self):
        '''Update an existing connection request'''
        
        print(g.args)

        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()

        # get arguments
        request_id = str(g.args["requestId"])
        status = str(g.args["status"])
        
        # query to get request after its updated 
        query_get = ''' SELECT r.request_id, r.request_from, r.request_to, r.status, u.first_name, u.last_name
                        FROM connection_requests r
                        JOIN users u on r.request_from = u.user_id
                        WHERE r.request_id = ? '''

        # check if request approved or ignored 

        if status == 'ignore':
            # if request is ignored 
            # update request status to ignore

            query = ''' UPDATE connection_requests
                        SET status = 'ignore'
                        WHERE request_id = ? '''
            
            try:
                cursor.execute(query, (request_id,))
                con.commit()                
            except Exception as e:
                print(e)
                response = {
                    "api_response": {
                        "code": 405,
                        "message": "Error! Not Allowed"
                    }
                }
                cursor.close()
                return response, 405, None

            # return updated request     
            try:
                cursor.execute(query_get, (request_id,))
                fetch_requests= cursor.fetchall()
                # return error if no request found
                if len(fetch_requests) < 1:
                    raise IndexError
            except IndexError:
                response = {
                    "api_response": {
                        "code": 404,
                        "message": "Error!"
                    }
                }
                cursor.close()
                return response, 400, None
            response = {key:val for key, val in zip(["requestId", "requestFrom", "requestTo", "status", "firstName", "lastName"], fetch_requests[0])}
            response["api_response"] = {
                "code": 200,
                "message": "Connection Request from {} {} was ignored".format(fetch_requests[0][4],fetch_requests[0][5])
            }
            cursor.close()
            return response, 200, None

        if status == 'approved': 
            # if request is approved 

            # update request status to approved

            query = ''' UPDATE connection_requests
                        SET status = 'approved'
                        WHERE request_id = ? '''
            
            try:
                cursor.execute(query, (request_id,))
                con.commit()                
            except Exception as e:
                print(e)
                response = {
                    "api_response": {
                        "code": 405,
                        "message": "Error! Not Allowed"
                    }
                }
                cursor.close()
                return response, 405, None
            
            # create new connection as request is approved 
       
            query_insert = '''INSERT INTO connections (user_id, connected_user_id)
                                SELECT request_from, u.user_id
                                FROM connection_requests r
                                JOIN users u on r.request_to = u.email_address
                                WHERE r.request_id = ?
                                AND r.status = 'approved'
                                UNION
                                SELECT u.user_id, request_from
                                FROM connection_requests r
                                JOIN users u on r.request_to = u.email_address
                                WHERE r.request_id = ?
                                AND r.status = 'approved'
                                ;'''
            try:
                cursor.execute(query_insert, (request_id, request_id))
                con.commit()                
            except Exception as e:
                print(e)
                response = {
                    "api_response": {
                        "code": 405,
                        "message": "Error! Not Allowed"
                    }
                }
                cursor.close()
                return response, 405, None

            # return updated request     
            try:
                cursor.execute(query_get, (request_id,))
                fetch_requests= cursor.fetchall()
                # return error if no request found
                if len(fetch_requests) < 1:
                    raise IndexError
            except IndexError:
                response = {
                    "api_response": {
                        "code": 404,
                        "message": "Error!"
                    }
                }
                cursor.close()
                return response, 400, None

            response = {key:val for key, val in zip(["requestId", "requestFrom", "requestTo", "status", "firstName", "lastName"], fetch_requests[0])}
            response["api_response"] = {
                "code": 200,
                "message": "Connection Request from {} {} was approved".format(fetch_requests[0][4],fetch_requests[0][5])
            }
            cursor.close()
            return response, 200, None
        # error if any other status provided 
        else:
            response = {
                    "api_response": {
                        "code": 405,
                        "message": "Error! Incorrect status supplied"
                    }
                }
            return response, 405, None

            
