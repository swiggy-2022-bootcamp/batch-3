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

