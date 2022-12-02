## Run Flask Web Server

### Install peera-app-backend requirements:

    $ cd peera-app-backend
    $ pip install -r requirements.txt

### Start peera-backend app:

    $ cd peera-backend
    $ python __init__.py
    
Then you can visit [http://127.0.0.1:5001/static/swagger-ui/index.html](http://127.0.0.1:5001/static/swagger-ui/index.html) in a browser to view the Swagger UI.

[Latest DB](https://drive.google.com/file/d/1oCHCYL3bzPVE3AQpzEEK8TaJfnSgo6Ju/view?usp=share_link)


## Updating schema 

For making updates to the schema -  
- Update the __swagger.yaml__ file. 
- Validate the schema, and preview changes on [Swagger UI](https://editor.swagger.io/) 
- Once validated, run the below command on the folder containing the __swagger.yaml__ file. 
   
        $ swagger_py_codegen -s swagger.yaml peera-app-backend -p peera-backend --ui --spec
- This will update the content within the __peera-app-backend__ folder based on the updates made to the schema 
- The API files with the relevant functions remain unchanged unless the actual API are changes (add/delete/update api respones, path, type of api, etc.)

More info available on swagger_py_codegen available here - https://github.com/guokr/swagger-py-codegen 
