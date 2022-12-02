# -*- coding: utf-8 -*-

###
### DO NOT CHANGE THIS FILE
### 
### The code is auto generated, your change will be overwritten by 
### code generating.
###
from __future__ import absolute_import

from .api.user import User
from .api.user_register import UserRegister
from .api.user_login import UserLogin
from .api.user_logout import UserLogout
from .api.user_validate_token import UserValidateToken
from .api.request import Request
from .api.connection import Connection
from .api.search import Search
from .api.members import Members
from .api.task import Task
from .api.task_delete import TaskDelete
from .api.task_getall import TaskGetall
from .api.task_gethistory import TaskGethistory
from .api.taskcomment import Taskcomment
from .api.project import Project
from .api.project_getall import ProjectGetall
from .api.capacity import Capacity
from .api.workload import Workload


routes = [
    dict(resource=User, urls=['/user'], endpoint='user'),
    dict(resource=UserRegister, urls=['/user/register'], endpoint='user_register'),
    dict(resource=UserLogin, urls=['/user/login'], endpoint='user_login'),
    dict(resource=UserLogout, urls=['/user/logout'], endpoint='user_logout'),
    dict(resource=UserValidateToken, urls=['/user/validate_token'], endpoint='user_validate_token'),
    dict(resource=Request, urls=['/request'], endpoint='request'),
    dict(resource=Connection, urls=['/connection'], endpoint='connection'),
    dict(resource=Search, urls=['/search'], endpoint='search'),
    dict(resource=Members, urls=['/members'], endpoint='members'),
    dict(resource=Task, urls=['/task'], endpoint='task'),
    dict(resource=TaskDelete, urls=['/task/delete'], endpoint='task_delete'),
    dict(resource=TaskGetall, urls=['/task/getall'], endpoint='task_getall'),
    dict(resource=TaskGethistory, urls=['/task/gethistory'], endpoint='task_gethistory'),
    dict(resource=Taskcomment, urls=['/taskcomment'], endpoint='taskcomment'),
    dict(resource=Project, urls=['/project'], endpoint='project'),
    dict(resource=ProjectGetall, urls=['/project/getall'], endpoint='project_getall'),
    dict(resource=Capacity, urls=['/capacity'], endpoint='capacity'),
    dict(resource=Workload, urls=['/workload'], endpoint='workload'),
]