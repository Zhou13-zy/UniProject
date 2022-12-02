![Peera2](https://user-images.githubusercontent.com/22726975/202676991-4bb50306-bd20-4f00-8a02-f29413c6e3c2.png)

# Peera - itworkedb4

- Anshul Bindal, z5227560
- Thomas Davie, z5263970 
- Zainal Ahamath, z5224747
- Zeyu Hou, z5190728 

# Installation Guide 

### System requirements - 
- Python - 3.9 
- NodeJS - (ideal version - 18.12.1) 
- npm - (ideal version - 8.19.2)

### Download Peera 

1. Navigate into the folder you would like to install Peera and clone app repo from Github by running the below command. 

    ```$ git clone https://github.com/unsw-cse-comp3900-9900-22T3/capstone-project-3900-w18a-itworkedb4.git Peera ```

### Setup Database 

2. In your newly create Peera folder, go into the src folder. 

    ```$ cd src```

    Download the Database file using the below command 

    ```$ wget --no-check-certificate 'https://docs.google.com/uc?export=download&id=1oCHCYL3bzPVE3AQpzEEK8TaJfnSgo6Ju' -O database.db```

    or 

    Navigate to the below link, download the database.db file and place it into the src folder. 

    https://drive.google.com/file/d/1oCHCYL3bzPVE3AQpzEEK8TaJfnSgo6Ju/

    Now we will proceed to start the backend server. 

### Setup Backend Server 

3. From src folder, navigate into peera-app-backend folder 

    ```$ cd peera-app-backend``` 

4. There will be a requirements.txt file in that folder. Now intall the python requirements by running the below command. 

    ```$ pip install -r requirements.txt```

5. Now navigate into the peera-backend folder and then run the initialising file 

    ```$ cd peera-backend```
    
    ```$ python __init__.py ```   

    Now your backend server should be up and running. 
    You can view the backend swagger UI by going to http://127.0.0.1:5001/static/swagger-ui/index.html#/ 

    Next, we will install the front-end server 

### Setup Frontend Server

6. Open a new terminal window and navigate to the main directory of the app i.e. the Peera folder, and then install the nodeJS dependencies 

    ```$ npm install```

7. Next, go into the frontend folder and install dependencies

    ```$ cd frontend```

    ```$ npm install```

8. Now we can start the nodejs server 

    ```$ npm start```

#### Peera is now running! Head to http://127.0.0.1:3000 to begin. 
