# Swiggy Case Study : Food-App

Backend for Food-App created using Node.js, Express, MongoDB as part of Swiggy's Case Study

## Requirements for project:

1. [NodeJS](https://nodejs.org/en/) - JS runtime used to run project's server
2. [MongoDB](https://www.mongodb.com/) - cross-platform JSON-like document oriented DB (NoSQL)
3. [Postman](https://www.postman.com/downloads/) - API platform for building and using APIs.

## Steps to run project:

1. Clone this repository
2. Move to current directory, i.e., the directory where this README.md exists
3. Run `npm i`
4. Run `npm start`
5. Access the project at `localhost:3000/api/[required API endpoint]`

## Project's code structure:

food_app/

- bin
  - www
- models/
  - food.js
  - user.js
- routes/
  - index.js
  - usersRoute.js
- .babelrc
- .gitignore
- app.js
- package.json
- README.md

## Features of project:

- CRUD operations on users
- Create and Read operations on foods

## API Endpoints:

1. `POST /api/register` - for registering new user
2. `POST /api/authenticate` - for authenticating existing user
3. `GET /api/users` - to get data of all users
4. `GET /api/users/:userID` - to get data of user with userID
5. `PUT /api/users/:userID` - to update data of user with userID
6. `DELETE /api/users/:userID` - to delete data of user with userID
7. `POST /api/food` - for creating new food
8. `GET /api/food/:foodID` - to get details of food with foodID
