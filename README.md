# Case Study Problem - StackOverFlow

### Problem Statement
The application serves as a platform for users to ask and answer questions, and,
through membership and active participation, to vote questions and answers up or down similar to
Reddit/Stack overflow and edit questions and answers.
Users of application can earn reputation points and "badges" for example, a person is awarded 10
reputation points for receiving an "up" vote on a question or an answer to a question, and can receive
badges for their valued contributions, which represents a gamification of the traditional Q&A website.
Users unlock new privileges with an increase in reputation like the ability to vote, comment, and even
edit other people's posts.

### Requirement Covered
- [x] Register a new user with name, email and password. Return a token
- [x] LogIn a new user with email and password. Return a token
- [x] Create a question with a title and body
- [x] Post an answer to a question. (If no answer given by that user)
- [x] Update an answer to a question. (If there is already an answer given by that user) 
- [x] Get List for all the question and answers
- [x] Upvote and Downvote a question and answe (Additional)
- [x] Create comment on a particular question and answer (Additional)
- [x] UI for Register, Login and create question (Additional)
- []  Implememnt user reputation points for interaction. (Additional)
 

### Project Setup Steps
 Clone this Repo. 
```
$ cd stackOverFlow
```
Start backend
```
cd backend
npm i
nodemon server.js
```
Start frontend
```
cd frontend
npm i
nodemon server.js
```
