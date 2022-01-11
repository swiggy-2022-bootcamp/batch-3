# Stack Overflow

This folder contains my submission for Problem Statement 3 - Stack Overflow.
I had modified the given problem statement and had added some other features.

## Models:
### 1. userModel:
  ```
  fname
  lname
  username
  email
  password
  ```
### 2. questionModel
```
userID - reference to userModel
title
body
```
### 3. answerModel
```
userID - reference to userModel
questionID - reference to questionModel
body
upvotes
downvotes
```
### 4. userUpvoteAnswer
```
userID - reference to userModel
answerID - reference to answerModel
```
### 5. userDownvoteAnswer
```
userID - reference to userModel
answerID - reference to answerModel
```

## Base URL:
```http://127.0.0.1:4000```

## API Endpoints:

### 1. POST: `/login`
Request Body: `email, password`  
Existing users can login

### 2. POST: `/register`
Request Body: `fname, lname, username, email, password`  
New users can register

### 3. POST: `/question`
Request Header: `JWT Token`  
Request Body: `title, body`  
Post new question

### 4. GET: `/question`
Request Header: `JWT Token`  
Fetch list of all questions

### 5. GET: `/question/<questionID>`
Request Header: `JWT Token`  
Fetch details and all answers of a specific question

### 6. POST: `/question/<questionID>/answer`
Request Header: `JWT Token`  
Request Body: `body`  
Post new answer for a specific question

### 7. PATCH: `/question/<questionID>/answer`
Request Header: `JWT Token`  
Request Body: `body`  
Update an already posted answer

### 8. GET: `/answer/<answerID>`
Request Header: `JWT Token`  
Fetch details of a specific answer

### 8. POST: `/answer/<answerID>/upvote`
Request Header: `JWT Token`  
Upvote an answer

### 9. POST: `/answer/<answerID>/downvote`
Request Header: `JWT Token`  
Downvote an answer

