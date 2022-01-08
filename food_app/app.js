import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import routes from './routes/index.js';

const app = express();

/* Connect to the database */
// TODO
// Will need to move DB_URL to env variable in future
mongoose.connect('mongodb://localhost:27017/FoodApp', (err) => {
    console.log(err ? err : "Successfully connected to DB")
});

/* Middleware */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// catch 404
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(404).send(`Error: ${res.originUrl} not found`);
    next();
});

// catch 500
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send(`Internal Server Error: ${err}`);
    next();
});

/* Register the routes */
routes(app);

export default app;