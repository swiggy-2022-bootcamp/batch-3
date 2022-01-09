# Selected Problem Statement - Problem Statement 3(stack-overflow)
# Name of the Project - Question, Answers & Vote

The app is a functional, backend-only, implementation of the Stackoverflow website and as the name suggests, it allows the user to ask, answer and vote.


## Features

- Authentication for all the possible actions is done using JWT.
- All the user details are stored on a database using MongoDB.
- All the passwords are hashed and compared while logging in using the bcryptjs module
- Upvote and Downvote Features are implemented for both, the questions and the answers.

## API CALLS AND RESULTS

1. Register: {endpoint : /register}
Scenario 1: All the values are present and email and username unique

```JSON
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
2. Login: {endpoint : /login}
Scenario 1: Valid Credentials

```JSON
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

3. Posting a Question

Scenario 1: Valid details

```JSON
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
{
  "title": "<title of the question>",
  "body": "<body of the question>",
}

Response:
{
    "message": "Unauthorized Request!"
}
```
