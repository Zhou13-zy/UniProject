# -*- coding: utf-8 -*-

import six
from jsonschema import RefResolver
# TODO: datetime support

class RefNode(object):

    def __init__(self, data, ref):
        self.ref = ref
        self._data = data

    def __getitem__(self, key):
        return self._data.__getitem__(key)

    def __setitem__(self, key, value):
        return self._data.__setitem__(key, value)

    def __getattr__(self, key):
        return self._data.__getattribute__(key)

    def __iter__(self):
        return self._data.__iter__()

    def __repr__(self):
        return repr({'$ref': self.ref})

    def __eq__(self, other):
        if isinstance(other, RefNode):
            return self._data == other._data and self.ref == other.ref
        elif six.PY2:
            return object.__eq__(other)
        elif six.PY3:
            return object.__eq__(self, other)
        else:
            return False

    def __deepcopy__(self, memo):
        return RefNode(copy.deepcopy(self._data), self.ref)

    def copy(self):
        return RefNode(self._data, self.ref)

###
### DO NOT CHANGE THIS FILE
### 
### The code is auto generated, your change will be overwritten by 
### code generating.
###

base_path = '/v1'

definitions = {'definitions': {'User': {'type': 'object', 'properties': {'userId': {'type': 'string'}, 'email': {'type': 'string'}, 'password': {'type': 'string'}, 'firstName': {'type': 'string'}, 'lastName': {'type': 'string'}, 'capacity': {'type': 'integer', 'format': 'int64'}}}, 'Token': {'type': 'object', 'properties': {'userId': {'type': 'string'}, 'firstName': {'type': 'string'}, 'lastName': {'type': 'string'}, 'email': {'type': 'string'}, 'capacity': {'type': 'integer'}, 'token': {'type': 'string'}}}, 'Request': {'type': 'object', 'properties': {'requestId': {'type': 'integer', 'format': 'int64'}, 'requestTo': {'type': 'string'}, 'requestFrom': {'type': 'string'}, 'status': {'type': 'string', 'description': 'connection request status', 'enum': ['approved', 'pending', 'ignore']}, 'firstName': {'type': 'string'}, 'lastName': {'type': 'string'}}}, 'ArrayOfRequests': {'type': 'array', 'items': {'$ref': '#/definitions/Request'}}, 'Task': {'type': 'object', 'properties': {'taskId': {'type': 'integer', 'format': 'int64'}, 'projectId': {'type': 'integer', 'format': 'int64'}, 'title': {'type': 'string'}, 'summary': {'type': 'string'}, 'status': {'type': 'string'}, 'createdBy': {'type': 'integer'}, 'assignedTo': {'type': 'integer'}, 'dueDate': {'type': 'string'}, 'createdTime': {'type': 'string'}, 'updatedTime': {'type': 'string'}, 'effort': {'type': 'integer'}}}, 'ArrayOfTasks': {'type': 'array', 'items': {'$ref': '#/definitions/Task'}}, 'TaskComment': {'type': 'object', 'properties': {'commentId': {'type': 'integer', 'format': 'int64'}, 'taskId': {'type': 'integer', 'format': 'int64'}, 'commentText': {'type': 'string'}, 'commentBy': {'type': 'string'}}}, 'ArrayOfTaskComments': {'type': 'array', 'items': {'$ref': '#/definitions/TaskComment'}}, 'Connection': {'type': 'object', 'properties': {'userId': {'type': 'integer', 'format': 'int64'}, 'connectedUserId': {'type': 'integer', 'format': 'int64'}, 'firstName': {'type': 'string'}, 'lastName': {'type': 'string'}, 'emailAddress': {'type': 'string'}}}, 'ArrayOfConnections': {'type': 'array', 'items': {'$ref': '#/definitions/Connection'}}, 'ProjectMember': {'type': 'object', 'properties': {'projectId': {'type': 'integer', 'format': 'int64'}, 'userId': {'type': 'integer', 'format': 'int64'}, 'role': {'type': 'string'}, 'projectName': {'type': 'string'}, 'projectDescription': {'type': 'string'}, 'firstName': {'type': 'integer'}, 'lastName': {'type': 'integer'}, 'emailAddress': {'type': 'string'}, 'capacity': {'type': 'integer'}}}, 'Project': {'type': 'object', 'properties': {'projectId': {'type': 'integer', 'format': 'int64'}, 'projectName': {'type': 'string'}, 'projectDescription': {'type': 'string'}, 'projectOwner': {'type': 'integer', 'format': 'int64'}, 'createdTime': {'type': 'string'}}}, 'ArrayOfProjects': {'type': 'array', 'items': {'$ref': '#/definitions/Project'}}, 'ArrayOfProjectMembers': {'type': 'array', 'items': {'$ref': '#/definitions/ProjectMember'}}, 'Created': {'type': 'object', 'properties': {'api_response': {'type': 'object', 'properties': {'code': {'type': 'integer', 'format': 'int32', 'example': 201, 'description': 'HTTP status code'}, 'message': {'type': 'string', 'example': 'Success! Created', 'description': 'status description'}}}}}, 'OK': {'type': 'object', 'properties': {'api_response': {'type': 'object', 'properties': {'code': {'type': 'integer', 'format': 'int32', 'example': 200, 'description': 'HTTP status code'}, 'message': {'type': 'string', 'example': 'OK', 'description': 'status description'}}}}}, 'Invalid': {'type': 'object', 'properties': {'api_response': {'type': 'object', 'properties': {'code': {'type': 'integer', 'format': 'int32', 'example': 400, 'description': 'HTTP status code'}, 'message': {'type': 'string', 'example': 'Error! Invalid', 'description': 'Custom message'}}}}}, 'NotFound': {'type': 'object', 'properties': {'api_response': {'type': 'object', 'properties': {'code': {'type': 'integer', 'format': 'int32', 'example': 404, 'description': 'HTTP status code'}, 'message': {'type': 'string', 'example': 'Error! Not Found', 'description': 'status description'}}}}}, 'NotAllowed': {'type': 'object', 'properties': {'api_response': {'type': 'object', 'properties': {'code': {'type': 'integer', 'format': 'int32', 'example': 405, 'description': 'HTTP status code'}, 'message': {'type': 'string', 'example': 'Error! Not Allowed', 'description': 'status description'}}}}}}, 'parameters': {}}

validators = {
    ('user', 'GET'): {'args': {'required': ['userId'], 'properties': {'userId': {'description': 'ID of the user that needs to be retrieved', 'type': 'integer', 'format': 'int64'}}}},
    ('user_register', 'POST'): {'json': {'$ref': '#/definitions/User'}},
    ('user_login', 'POST'): {'args': {'required': ['username', 'password'], 'properties': {'username': {'description': 'The user name for login', 'type': 'string'}, 'password': {'description': 'The password for login', 'type': 'string'}}}},
    ('user_logout', 'DELETE'): {'args': {'required': ['token'], 'properties': {'token': {'description': 'Token for deletion', 'type': 'string'}}}},
    ('user_validate_token', 'PUT'): {'args': {'required': ['token'], 'properties': {'token': {'description': 'The token to be validated', 'type': 'string'}}}},
    ('request', 'GET'): {'args': {'required': ['userId'], 'properties': {'userId': {'description': 'ID of the user that a request is sent to, pending approvals for that user', 'type': 'integer', 'format': 'int64'}}}},
    ('request', 'POST'): {'args': {'required': ['requestTo', 'requestFrom'], 'properties': {'requestTo': {'description': 'User the invite to be sent to - email', 'type': 'string'}, 'requestFrom': {'description': 'User the invite is sent from - username', 'type': 'string'}}}},
    ('request', 'PUT'): {'args': {'required': ['requestId', 'status'], 'properties': {'requestId': {'description': 'ID of the request that needs to be updated', 'type': 'integer', 'format': 'int64'}, 'status': {'description': 'Approve or Ignore Project Invite', 'type': 'string'}}}},
    ('connection', 'GET'): {'args': {'required': ['userId'], 'properties': {'userId': {'description': 'ID of the user to fetch list of connections for', 'type': 'integer', 'format': 'int64'}, 'connectedUserId': {'description': 'ID of the user that a request is sent to, pending approvals for that user', 'required': False, 'type': 'integer', 'format': 'int64'}}}},
    ('connection', 'DELETE'): {'args': {'required': ['userId', 'connectedUserId'], 'properties': {'userId': {'description': 'ID of the user requesting deletion', 'type': 'integer', 'format': 'int64'}, 'connectedUserId': {'description': 'ID of the user that the connection needs to be removed for', 'type': 'integer', 'format': 'int64'}}}},
    ('search', 'GET'): {'args': {'required': ['search'], 'properties': {'search': {'description': 'search query', 'type': 'string'}}}},
    ('members', 'GET'): {'args': {'required': ['projectId'], 'properties': {'projectId': {'description': 'ID of the project for which members needs to be retrieved', 'type': 'integer', 'format': 'int64'}}}},
    ('members', 'POST'): {'args': {'required': ['projectId', 'userId', 'role'], 'properties': {'projectId': {'description': 'ID of the project for which members needs to be retrieved', 'type': 'integer', 'format': 'int64'}, 'userId': {'description': 'ID of the user that needs to be added to project', 'type': 'integer', 'format': 'int64'}, 'role': {'description': 'Role of the user in the poject', 'type': 'string'}}}},
    ('members', 'DELETE'): {'args': {'required': ['projectId', 'userId'], 'properties': {'projectId': {'description': 'ID of the project for which members needs to be removed from', 'type': 'integer', 'format': 'int64'}, 'userId': {'description': 'ID of the user that needs to be removed to project', 'type': 'integer', 'format': 'int64'}}}},
    ('task', 'GET'): {'args': {'required': ['taskId'], 'properties': {'taskId': {'description': 'ID of the task that needs to be retrieved', 'type': 'integer', 'format': 'int64'}}}},
    ('task', 'POST'): {'json': {'$ref': '#/definitions/Task'}},
    ('task', 'PUT'): {'json': {'$ref': '#/definitions/Task'}, 'args': {'required': ['taskId'], 'properties': {'taskId': {'description': 'ID of the request that needs to be updated', 'type': 'integer', 'format': 'int64'}}}},
    ('task', 'DELETE'): {'args': {'required': ['taskId'], 'properties': {'taskId': {'description': 'ID of the task that needs to be deleted', 'type': 'integer', 'format': 'int64'}}}},
    ('task_delete', 'PUT'): {'args': {'required': ['taskId'], 'properties': {'taskId': {'description': 'ID of the task that needs to be deleted', 'type': 'integer', 'format': 'int64'}}}},
    ('task_getall', 'GET'): {'args': {'required': [], 'properties': {'userId': {'description': 'ID of the user whose tasks we want to fetch', 'required': False, 'type': 'integer', 'format': 'int64'}, 'projectId': {'description': 'ID of the project we want to fetch tasks from', 'required': False, 'type': 'integer', 'format': 'int64'}}}},
    ('task_gethistory', 'GET'): {'args': {'required': ['taskId'], 'properties': {'taskId': {'description': 'ID of the task we want to fetch history for', 'type': 'integer', 'format': 'int64'}}}},
    ('taskcomment', 'GET'): {'args': {'required': ['taskId'], 'properties': {'taskId': {'description': 'ID of the task for which comments are to be retrieved', 'type': 'integer', 'format': 'int64'}}}},
    ('taskcomment', 'POST'): {'json': {'$ref': '#/definitions/TaskComment'}},
    ('taskcomment', 'PUT'): {'json': {'$ref': '#/definitions/TaskComment'}},
    ('taskcomment', 'DELETE'): {'args': {'required': ['taskId', 'commentId'], 'properties': {'taskId': {'description': 'ID of the task that needs to be deleted', 'type': 'integer', 'format': 'int64'}, 'commentId': {'description': 'ID of the task comment that needs to be deleted', 'type': 'integer', 'format': 'int64'}}}},
    ('project', 'GET'): {'args': {'required': ['projectId'], 'properties': {'projectId': {'description': 'ID of the project that needs to be retrieved', 'type': 'integer', 'format': 'int64'}}}},
    ('project', 'POST'): {'json': {'$ref': '#/definitions/Project'}},
    ('project', 'PUT'): {'json': {'$ref': '#/definitions/Project'}, 'args': {'required': ['projectId'], 'properties': {'projectId': {'description': 'ID of the request that needs to be updated', 'type': 'integer', 'format': 'int64'}}}},
    ('project', 'DELETE'): {'args': {'required': ['projectId'], 'properties': {'projectId': {'description': 'ID of the project that needs to be deleted', 'type': 'integer', 'format': 'int64'}}}},
    ('project_getall', 'GET'): {'args': {'required': [], 'properties': {'userId': {'description': 'ID of the user whose projects we want to fetch', 'required': False, 'type': 'integer', 'format': 'int64'}}}},
    ('capacity', 'PUT'): {'args': {'required': ['userId', 'capacity'], 'properties': {'userId': {'description': 'ID of the user that needs to be updated', 'type': 'integer', 'format': 'int64'}, 'capacity': {'description': 'Capacity to set for the user', 'type': 'integer', 'format': 'int64'}}}},
    ('workload', 'GET'): {'args': {'required': ['userId'], 'properties': {'userId': {'description': 'ID of the user that needs to be updated', 'type': 'integer', 'format': 'int64'}}}},
}

filters = {
    ('user', 'GET'): {200: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/User'}, {'$ref': '#/definitions/OK'}]}}, 404: {'headers': None, 'schema': {'$ref': '#/definitions/NotFound'}}},
    ('user_register', 'POST'): {201: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/User'}, {'$ref': '#/definitions/Created'}]}}, 400: {'headers': None, 'schema': {'$ref': '#/definitions/Invalid'}}},
    ('user_login', 'POST'): {201: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/Token'}, {'$ref': '#/definitions/Created'}]}}, 400: {'headers': None, 'schema': {'$ref': '#/definitions/Invalid'}}},
    ('user_logout', 'DELETE'): {200: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/OK'}]}}, 400: {'headers': None, 'schema': {'$ref': '#/definitions/Invalid'}}},
    ('user_validate_token', 'PUT'): {201: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/Token'}, {'$ref': '#/definitions/Created'}]}}, 400: {'headers': None, 'schema': {'$ref': '#/definitions/Invalid'}}},
    ('request', 'GET'): {200: {'headers': None, 'schema': {'$ref': '#/definitions/ArrayOfRequests'}}, 404: {'headers': None, 'schema': {'$ref': '#/definitions/NotFound'}}},
    ('request', 'POST'): {201: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/Request'}, {'$ref': '#/definitions/Created'}]}}, 405: {'headers': None, 'schema': {'$ref': '#/definitions/NotAllowed'}}, 400: {'headers': None, 'schema': {'$ref': '#/definitions/Invalid'}}},
    ('request', 'PUT'): {200: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/Request'}, {'$ref': '#/definitions/OK'}]}}, 405: {'headers': None, 'schema': {'$ref': '#/definitions/NotAllowed'}}},
    ('connection', 'GET'): {200: {'headers': None, 'schema': {'$ref': '#/definitions/ArrayOfConnections'}}, 404: {'headers': None, 'schema': {'$ref': '#/definitions/NotFound'}}},
    ('connection', 'DELETE'): {200: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/OK'}]}}, 404: {'headers': None, 'schema': {'$ref': '#/definitions/NotFound'}}},
    ('search', 'GET'): {200: {'headers': None, 'schema': {'allOf': [{'type': 'object', 'properties': {'numUsers': {'type': 'integer', 'format': 'int32', 'example': 20, 'description': 'Size of the resultant users array'}, 'numTasks': {'type': 'integer', 'format': 'int32', 'example': 20, 'description': 'Size of the resultant tasks array'}, 'users': {'type': 'array', 'items': {'$ref': '#/definitions/User'}}, 'tasks': {'$ref': '#/definitions/ArrayOfTasks'}}}, {'$ref': '#/definitions/OK'}]}}, 404: {'headers': None, 'schema': {'$ref': '#/definitions/NotFound'}}},
    ('members', 'GET'): {200: {'headers': None, 'schema': {'$ref': '#/definitions/ArrayOfProjectMembers'}}, 404: {'headers': None, 'schema': {'$ref': '#/definitions/NotFound'}}},
    ('members', 'POST'): {201: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/ProjectMember'}, {'$ref': '#/definitions/Created'}]}}, 400: {'headers': None, 'schema': {'$ref': '#/definitions/Invalid'}}},
    ('members', 'DELETE'): {200: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/OK'}]}}, 404: {'headers': None, 'schema': {'$ref': '#/definitions/NotFound'}}},
    ('task', 'GET'): {200: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/Task'}, {'type': 'object', 'properties': {'links': {'type': 'array', 'description': 'HATEOAS', 'items': {'type': 'object', 'properties': {'href': {'type': 'string', 'description': 'hypertext reference'}, 'rel': {'type': 'string', 'description': 'relation'}}}, 'example': [{'href': '/task', 'rel': 'task'}]}}}, {'$ref': '#/definitions/OK'}]}}, 404: {'headers': None, 'schema': {'$ref': '#/definitions/NotFound'}}},
    ('task', 'POST'): {201: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/Task'}, {'type': 'object', 'properties': {'links': {'type': 'array', 'description': 'HATEOAS', 'items': {'type': 'object', 'properties': {'href': {'type': 'string', 'description': 'hypertext reference'}, 'rel': {'type': 'string', 'description': 'relation'}}}, 'example': [{'href': '/task', 'rel': 'task'}]}}}, {'$ref': '#/definitions/Created'}]}}, 400: {'headers': None, 'schema': {'$ref': '#/definitions/Invalid'}}},
    ('task', 'PUT'): {200: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/Request'}, {'type': 'object', 'properties': {'links': {'type': 'array', 'description': 'HATEOAS', 'items': {'type': 'object', 'properties': {'href': {'type': 'string', 'description': 'hypertext reference'}, 'rel': {'type': 'string', 'description': 'relation'}}, 'example': [{'href': '/search', 'rel': 'search'}, {'href': '/message/12', 'rel': 'message'}, {'href': '/block/12', 'rel': 'block'}]}}}}, {'$ref': '#/definitions/OK'}]}}, 405: {'headers': None, 'schema': {'$ref': '#/definitions/NotAllowed'}}},
    ('task', 'DELETE'): {200: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/OK'}]}}, 404: {'headers': None, 'schema': {'$ref': '#/definitions/NotFound'}}},
    ('task_delete', 'PUT'): {200: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/OK'}]}}, 400: {'headers': None, 'schema': {'$ref': '#/definitions/Invalid'}}},
    ('task_getall', 'GET'): {200: {'headers': None, 'schema': {'$ref': '#/definitions/ArrayOfTasks'}}, 404: {'headers': None, 'schema': {'$ref': '#/definitions/NotFound'}}},
    ('task_gethistory', 'GET'): {200: {'headers': None, 'schema': {'$ref': '#/definitions/ArrayOfTasks'}}, 404: {'headers': None, 'schema': {'$ref': '#/definitions/NotFound'}}},
    ('taskcomment', 'GET'): {200: {'headers': None, 'schema': {'$ref': '#/definitions/ArrayOfTaskComments'}}, 404: {'headers': None, 'schema': {'$ref': '#/definitions/NotFound'}}},
    ('taskcomment', 'POST'): {201: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/TaskComment'}, {'$ref': '#/definitions/Created'}]}}, 400: {'headers': None, 'schema': {'$ref': '#/definitions/Invalid'}}},
    ('taskcomment', 'PUT'): {200: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/Request'}, {'$ref': '#/definitions/OK'}]}}, 405: {'headers': None, 'schema': {'$ref': '#/definitions/NotAllowed'}}},
    ('taskcomment', 'DELETE'): {200: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/OK'}]}}, 404: {'headers': None, 'schema': {'$ref': '#/definitions/NotFound'}}},
    ('project', 'GET'): {200: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/Project'}, {'$ref': '#/definitions/OK'}]}}, 404: {'headers': None, 'schema': {'$ref': '#/definitions/NotFound'}}},
    ('project', 'POST'): {201: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/Project'}, {'$ref': '#/definitions/Created'}]}}, 400: {'headers': None, 'schema': {'$ref': '#/definitions/Invalid'}}},
    ('project', 'PUT'): {200: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/Request'}, {'$ref': '#/definitions/OK'}]}}, 405: {'headers': None, 'schema': {'$ref': '#/definitions/NotAllowed'}}},
    ('project', 'DELETE'): {200: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/OK'}]}}, 404: {'headers': None, 'schema': {'$ref': '#/definitions/NotFound'}}},
    ('project_getall', 'GET'): {200: {'headers': None, 'schema': {'$ref': '#/definitions/ArrayOfProjects'}}, 404: {'headers': None, 'schema': {'$ref': '#/definitions/NotFound'}}},
    ('capacity', 'PUT'): {200: {'headers': None, 'schema': {'allOf': [{'$ref': '#/definitions/User'}, {'$ref': '#/definitions/OK'}]}}, 405: {'headers': None, 'schema': {'$ref': '#/definitions/NotAllowed'}}},
    ('workload', 'GET'): {200: {'headers': None, 'schema': {'allOf': [{'type': 'object', 'properties': {'workload': {'type': 'integer', 'format': 'int64'}}}, {'$ref': '#/definitions/OK'}]}}, 404: {'headers': None, 'schema': {'$ref': '#/definitions/NotFound'}}},
}

scopes = {
}

resolver = RefResolver.from_schema(definitions)

class Security(object):

    def __init__(self):
        super(Security, self).__init__()
        self._loader = lambda: []

    @property
    def scopes(self):
        return self._loader()

    def scopes_loader(self, func):
        self._loader = func
        return func

security = Security()


def merge_default(schema, value, get_first=True, resolver=None):
    # TODO: more types support
    type_defaults = {
        'integer': 9573,
        'string': 'something',
        'object': {},
        'array': [],
        'boolean': False
    }

    results = normalize(schema, value, type_defaults, resolver=resolver)
    if get_first:
        return results[0]
    return results


def normalize(schema, data, required_defaults=None, resolver=None):
    if required_defaults is None:
        required_defaults = {}
    errors = []

    class DataWrapper(object):

        def __init__(self, data):
            super(DataWrapper, self).__init__()
            self.data = data

        def get(self, key, default=None):
            if isinstance(self.data, dict):
                return self.data.get(key, default)
            return getattr(self.data, key, default)

        def has(self, key):
            if isinstance(self.data, dict):
                return key in self.data
            return hasattr(self.data, key)

        def keys(self):
            if isinstance(self.data, dict):
                return list(self.data.keys())
            return list(getattr(self.data, '__dict__', {}).keys())

        def get_check(self, key, default=None):
            if isinstance(self.data, dict):
                value = self.data.get(key, default)
                has_key = key in self.data
            else:
                try:
                    value = getattr(self.data, key)
                except AttributeError:
                    value = default
                    has_key = False
                else:
                    has_key = True
            return value, has_key

    def _merge_dict(src, dst):
        for k, v in six.iteritems(dst):
            if isinstance(src, dict):
                if isinstance(v, dict):
                    r = _merge_dict(src.get(k, {}), v)
                    src[k] = r
                else:
                    src[k] = v
            else:
                src = {k: v}
        return src

    def _normalize_dict(schema, data):
        result = {}
        if not isinstance(data, DataWrapper):
            data = DataWrapper(data)

        for _schema in schema.get('allOf', []):
            rs_component = _normalize(_schema, data)
            _merge_dict(result, rs_component)

        for key, _schema in six.iteritems(schema.get('properties', {})):
            # set default
            type_ = _schema.get('type', 'object')

            # get value
            value, has_key = data.get_check(key)
            if has_key or '$ref' in _schema:
                result[key] = _normalize(_schema, value)
            elif 'default' in _schema:
                result[key] = _schema['default']
            elif key in schema.get('required', []):
                if type_ in required_defaults:
                    result[key] = required_defaults[type_]
                else:
                    errors.append(dict(name='property_missing',
                                       message='`%s` is required' % key))

        additional_properties_schema = schema.get('additionalProperties', False)
        if additional_properties_schema is not False:
            aproperties_set = set(data.keys()) - set(result.keys())
            for pro in aproperties_set:
                result[pro] = _normalize(additional_properties_schema, data.get(pro))

        return result

    def _normalize_list(schema, data):
        result = []
        if hasattr(data, '__iter__') and not isinstance(data, (dict, RefNode)):
            for item in data:
                result.append(_normalize(schema.get('items'), item))
        elif 'default' in schema:
            result = schema['default']
        return result

    def _normalize_default(schema, data):
        if data is None:
            return schema.get('default')
        else:
            return data

    def _normalize_ref(schema, data):
        if resolver == None:
            raise TypeError("resolver must be provided")
        ref = schema.get(u"$ref")
        scope, resolved = resolver.resolve(ref)
        if resolved.get('nullable', False) and not data:
            return {}
        return _normalize(resolved, data)

    def _normalize(schema, data):
        if schema is True or schema == {}:
            return data
        if not schema:
            return None
        funcs = {
            'object': _normalize_dict,
            'array': _normalize_list,
            'default': _normalize_default,
            'ref': _normalize_ref
        }
        type_ = schema.get('type', 'object')
        if type_ not in funcs:
            type_ = 'default'
        if schema.get(u'$ref', None):
            type_ = 'ref'

        return funcs[type_](schema, data)

    return _normalize(schema, data), errors
