# Stackunderflow
Stackunderflow supported features/APIs:
1. Healthcheck
2. Register a new user
3. Login user
4. Ask Question
5. Update Question
6. Edit other's question - If reputation of editing user is meeting standard for this task.
7. Upvote Question
8. Downvote Question
9. Get all answer for a given question
10. Post Answer
11. Update Answer
12. Upvote Answer
13. Downvote Answer 

## Setting up project locally

1. Make sure you have `nodejs v16.13.1` and `docker` installed on your system.
2. Clone the repository using `git clone git@github.com:22sujata8d/stackunderflow.git` or `git clone https://github.com/22sujata8d/stackunderflow.git` according to you system git settings.
3. Run docker compose file using `docker-compose up` to start the POSTGRES DB.
4. Create the database stackunderflow using command `create database stackunderflow`.
5. To form the database Schema. Run the following lines for the models in schema.
   - `psql -f 1.sql stackunderflow`
   - `psql -f 2.sql stackunderflow`
   - `psql -f 3.sql stackunderflow`
   - `psql -f 4.sql stackunderflow`
   - `psql -f 5.sql stackunderflow`
   - `psql -f 6.sql stackunderflow`
   - `psql -f 7.sql stackunderflow`
   
7. Run `npm install` to install packages from `package.json` or `npm ci` to install from `package-lock.json`.
8. Run `npm run start` to start the server at `localhost:8000`.

