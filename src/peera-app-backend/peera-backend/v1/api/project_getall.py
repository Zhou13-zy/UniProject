# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource, db_helpers
from .. import schemas

import sqlite3

DATABASE = "../../database.db"


class ProjectGetall(Resource):

    def get(self):
        '''Getch all projects a user is a member of'''
        # access db
        con = db_helpers.newConnection(DATABASE)
        cursor = con.cursor()

        # build sql query
        query = '''SELECT m.project_id, p.project_name, p.project_description, p.project_owner, p.created_time
            FROM project_members m
            JOIN projects p ON m.project_id = p.project_id
            WHERE user_id = ?'''

        try:
            # run db query
            cursor.execute(query, (str(g.args["userId"]),))
            matching_projects = list((cursor.fetchall()))

            # return error if no matching projects found
            con.commit()
            if len(matching_projects) < 1:
                raise IndexError
        except IndexError:
            return {}, 404, None
        
        # convert reponse to list of dicts
        result = []
        for project in matching_projects: 
            result.append({key:val for key, val in zip(["projectId", "projectName", "projectDescription", "projectOwner", "createdTime"], project)})
        
        # return the thing
        return result, 200, None