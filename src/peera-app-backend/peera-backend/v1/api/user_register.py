# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function
import sqlite3
from json import dumps


from flask import request, g

from .auth import hash
from . import Resource, db_helpers
from .. import schemas

DATABASE = "../../database.db"

class UserRegister(Resource):

    def post(self):
        '''Create a new user'''

        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()
        
        # query for creating new user - 40 to set default capacity to 40 hours 
        query = '''INSERT INTO users(user_id, email_address, password, first_name, last_name, capacity)
                   VALUES (null,?,?,?,?,40)'''
        
        # get API arguments 

        vals = list(g.json.values())
        
        # add new user to DB 

        try:
            cursor.execute(query, (vals[1], hash(vals[2]), vals[3], vals[4]))
            con.commit()
        except Exception as e:
            print("ERROR!")
            print(e)
            cursor.close()
            return {}, 400, None
        fetch_user = []

        # get new user from DB 

        try:
            cursor.execute('SELECT * FROM users WHERE email_address = ?', (vals[1],))
            fetch_user = cursor.fetchone()
        except Exception as e:
            print("ERROR!")
            print(e)
        print(fetch_user)

        # add user to forum project 

        query_forum = '''INSERT INTO project_members(project_id, user_id, role)
                        VALUES (1,?,'User')'''

        try:
            cursor.execute(query_forum, (fetch_user[0], ))
            con.commit()
        except Exception as e:
            print("ERROR!")
            cursor.close()
            return {}, 400, None


        # return response
        response = {
            "userId": fetch_user[0],
            "email": fetch_user[1],
            "password": fetch_user[2],
            "firstName": fetch_user[3],
            "lastName": fetch_user[4],
            "capacity": fetch_user[5]
        }
        cursor.close()
        return response, 201, None