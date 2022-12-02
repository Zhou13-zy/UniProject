from hashlib import sha256

'''
Takes string, returns string hashed with SHA256
'''
def hash(password):
    return sha256(password.encode('UTF-8')).hexdigest()