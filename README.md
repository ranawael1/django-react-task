# Market App
The web application  is built using Django,Django restframework, React, HTML, CSS, Bootstrap and JavaScript.
You will need to login to be able to view and buy products.

## Content
* [Setup](#setup)
* [Demo](#demo)
* [Author](#authors)



## Setup
For the backend:
- make your virtual environment and activate it
- then download the project and go to ackend code
```bash
git clone https://github.com/ranawael1/django-react-task.git
cd django-react-tsk/backend
```
- install requirments 
```bash
pip insttall -r requirements.txt
```
- enter mysql shell and create database called db
```bash
mysql -u root -p
>> create database db;
>> exit
```
- go to settings file and chaneg the user and password for database
- makemigrations for the databases and then run the backend project
```bash
python3 manage.py makemigrations apps_user
python3 manage.py makemigrations 
python3 manage.py migrate 
python3 manage.py runserver
```
For the frontend
- open a new terminal and go to the frontend folder
```bash
cd django-react-task/frontend
```
- install node modules
```bash
npm i node-modules
```
- run the frontend project
```bash
npm start
```

## Usage
Once the project is all set go to url:http://localhost.3000/


## Demo



## Author

- Created by 
  [@ranawael1](https://github.com/ranawael1)




