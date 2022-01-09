# Selected Problem Statement - Problem Statement 3(stack-overflow)
# Name of the Project - Question, Answer & Vote

The app is a functional, backend-only, implementation of the Stackoverflow website and as the name suggests, it allows the user to ask questions, answer the questions and vote.

## Required Actions

- The application should have option to login to system.
- The application should allow to register.
- The application should allow to ask a question.
- The application should allow the user to answer the question.
- The application should show answers for the particular question


## Features

- Authentication for all the possible actions is done using JWT.
- All the user details are stored on a database using MongoDB.
- All the passwords are hashed and compared while logging in using the bcryptjs module
- Upvote and Downvote Features are implemented for both, the questions and the answers.

## Folder Structure

authChecker: This folder contains the middleware handling function "isAuthorised" stored in the file Authorisation.js

controllers: This folder has js files with all the method definitions to perform all the CRUD operations
- answerController.js: This file has method definitions for the answer related operations.
- questionController.js: This file has method definitions for the question related operations.
- userController.js: This file has method definitions for the user related operations.

models: This folder has all the Schema related information to store the data in the database. In all of the models, I'm using Schema's object id which is created for every record, as the main id to store all the information about the relating element and using it's reference to get other data.
- answerModel.js: This file has Schema defined for all the elements present in the answer object
- questionModel.js: This file has Schema defined for all the elements present in the question object
- userModel.js: This file has Schema defined for all the elements present in the user object

routes: Thisfolder has js files with endpoints defined for each action. These endpoints are used to get and post the information.
- answerRoute.js: This file has all the answer related routes.
- questionRoute.js: This file has all the question related routes.
- userRoute.js: This file has all the user related routes.

index.js: This is the main file that starts the application when npm start executes. It has info about all the modules present and how interaction needs to take place.

Miscellaneous: 
- node_modules: These are the module files that are added when node modules are installed. These are the dependencies that are required to run the application.
- package.json & package-lock.son: These files have information about the dependencies and also the tree in which they need to be installed in order to have a proper execution.
- .gitignore: Has path of the files that need to be ignored while commiting.

## Running the Application

#### Install NPM Packages

```
npm install
```

#### Start Server

```
npm start
```

## API Calls And Responses(TEST CASES) - Tested Using Postman

1. Register: {endpoint : /register} "POST request" 

Scenario 1: All the values are present and email and username unique

```JSON
Input:
{
  "email": "<unique_email>",
  "username": "<unique_username>",
  "password": "<password>"
}

Response:

{
    "msg": "User Added Successfully"
}
```
Scenario 2: Duplicate username or email

```JSON
Input:
{
  "email": "<duplicate_email>",
  "username": "<duplicate_username>",
  "password": "<password>"
}

Response:

{
    "msg": "User Already Exists"
}
```
Scenario 3: Either missing email/username or a duplicate entry
Case 1:
```JSON
Input:
{
  "username": "<username>",
  "password": "<password>"
}

Response:
{
    "msg": "User Already Exists or Some of the input parameters are missing"
}
```
Case 2:
```JSON
Input:
{
  "email": "<duplicate_email>",
  "username": "<duplicate_username>",
  "password": "<password>"
}

Response:

{
    "msg": "User Already Exists or Some of the input parameters are missing"
}
```
2. Login: {endpoint : /login} "POST request"
Scenario 1: Valid Credentials

```JSON
Input:
{
  "email": "<email>",
  "password": "<password>"
}

Response:
{
    "status": 201,
    "message": "User logged in successfully",
    "token": "<JWT_token>"
}
```
Scenario 2: Invalid Credentials

```JSON
Input:
{
  "email": "<email>",
  "password": "<password>"
}

Response:
{
    "status": 404,
    "message": "Incorrect Email/Password"
}
```

3. Posting a Question {endpoint: /question} "POST request"

Scenario 1: Valid details

```JSON
Input:
{
  "title": "<title of the question>",
  "body": "<body of the question>",
  "token": "<JWT_token>"
}

Response:
{
    "message": "Question posted successfully",
    "Question_id": "<question_id>"
}
```

Scenario 2: Missing Parameters
Case 1: Missing title or body
```JSON
Input:
{
  "title": "<title of the question>",
  "token": "<JWT_token>"
}

Response:
{
    "message": "Some of the parameters might be missing, please check and try again!"
}
```

Case 2: Missing JWT token 
```JSON
Input:
{
  "title": "<title of the question>",
  "body": "<body of the question>",
}

Response:
{
    "message": "Unauthorized Request!"
}
```
4. Posting an Answer {endpoint: /answer} "POST request"
```JSON
Input:
{
  "_id": "<Question_id>",
  "answer": "<answer>",
  "token": "<JWT_token>"
}

Response:
{
    "message": "Answer Created",
    "Answer_id": "<Answer_id>"
}
```

5. Logout {endpoint: /logout} "POST request"
```JSON
Input:
{
  "token": "<JWT_token>"
}

Response:
{
    "message": "Logout Success!"
}
```
6. Upvoting a Question {endpoint: /question/upvote} "POST request"
```JSON
Input:
{
  "_id": "<Question_id",
  "token": "<JWT_token>"
}

Response:
{
    "message": "Upvote Successful!"
}
```

7. Get All Questions {endpoint: /question/getall} "GET request"

```JSON

Input:
No parameters required 


Response:
{
    "QuestionObjects"
}
```

8. Get All Answers For A Question {endpoint: /answer/getall} "GET request"

```JSON
Input:
{
  "_id": "<Question_id",
}

Response:
{
    "AnswerObjects"
}
```


