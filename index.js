const swaggerUi = require('swagger-ui-express');
const express = require("express");
const bp = require('body-parser');
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("connected to database"))
    .catch(err => console.log(err));


// routers
const userRouter = require('./routers/userRouter');
const questionRouter = require('./routers/questionRouter');

const app = express();
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(require('./swaggerSpec')));
app.use(cors());
app.use(bp.json());

app.use('/users', userRouter);
app.use('/questions', questionRouter);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});