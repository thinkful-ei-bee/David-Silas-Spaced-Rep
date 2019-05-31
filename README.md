# Spaced Repetition Capstone

Learn the Italian language with spaced repetition. Each user is given a set of words to translate, and when you get it 
right, you get a point. The words you struggle with the most show up more often, and the ones you're comfortable with
show up less often. It's proven to work!

This project is focused on using the linked list data structure in its database. It is also a crash course in full-stack,
cooperative development. It was finished in four days.

Created by David Bolin and Silas Hallahan.
A Thinkful data structure project.

## Setup

Clone/fork this client repo and [the server repo](https://github.com/thinkful-ei-bee/David-Silas-Spaced-Rep-API). Run npm install on the client side. For the server, run "npm install" and create postgreSQL databases named "spaced-repetition" and "spaced-repetition-test". Then create a .env file in the root folder of the client with the following variables:

NODE_ENV=development\
PORT=8000\
TZ='UTC'\
MIGRATION_DB_HOST=127.0.0.1\
MIGRATION_DB_PORT=5432\
MIGRATION_DB_NAME=spaced-repetition\
MIGRATION_DB_USER=(the username for your new database)\
MIGRATION_DB_PASS=(password for your new database)\
DB_URL="postgresql://(user):(password)@localhost/spaced-repetition"\
TEST_DB_URL="postgresql://(user):(password)@localhost/spaced-repetition-test"\
JWT_SECRET="(whatever you want here)"\
JWT_EXPIRY="10h"

At that point you can use "npm run migrate" to configure the database for the project and "env MIGRATION_DB_NAME=spaced-repetition-test npm run migrate" to set up the test database.

In the client, in the file /src/config.js, change the variable API_ENDPOINT to point to your local server; by default the correct value for development would be "http://localhost:8000/api".

At that point you can start the server with "npm start" or "npm run dev" (to start nodemon), and the client with "npm start."

## Live App

The [live app is here](https://ds-spaced-repetition.now.sh). 

## Screenshots

![Dashboard](screenshots/ScreenClip.png)

![Learn a word](screenshots/ScreenClip2.png)


## API

This project is deployed on Zeit and Heroku. Details for using the API may be found in the readme at the [repo for the server]().

## Authorization
Create your won account or use these credentials to test the app:

Username: testuser

Password: abcA10!@

## Tech

* JavaScript ES6
* React
* Express
* PostgreSQL
* Cypress
