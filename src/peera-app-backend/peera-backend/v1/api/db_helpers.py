import sqlite3

# Helpers for SQL database operations


def newConnection(db):
    '''Given a path to a database, returns a new connection object'''
    con = None
    
    try:
        con = sqlite3.connect(db)
    except Exception as e:
        print(e)
    
    return con

def newTokenConnection(db):
    '''Given a path to a database, returns a new connection object'''
    con = None
    
    try:
        con = sqlite3.connect(db, detect_types=sqlite3.PARSE_DECLTYPES|sqlite3.PARSE_COLNAMES)
    except Exception as e:
        print(e)
    
    return con
