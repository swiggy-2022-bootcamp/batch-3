const express = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost:27017/QuestionAnswer&VoteDB'); 

const userRoute = require('./routes/userRoute');
const questionRoute = require('./routes/questionRoute');
const answersRoute = require('./routes/answerRoute');
const isAuthorisedChecker = require('./authChecker/Authorisation').isAuthorised;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(isAuthorisedChecker);
app.use('/', userRoute);
app.use('/question', questionRoute);
app.use('/answer', answersRoute);
app.listen(4000, ()=>{console.log('Server Running at 4000')});