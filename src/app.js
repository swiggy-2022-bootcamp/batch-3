/*
 * Copyright 2022 Debdyut Hajra
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const express = require('express')
require('express-async-errors');
const bodyParser = require('body-parser')

// Swagger dependency
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../contract/QA-Platform-API-v0.0.1.json')

// Logging dependency
const morgan = require('morgan')
const rfs = require('rotating-file-stream')

require('./config/config');
require('./config/db.config');

// Import controllers
const identityRoutes = require('./routes/identity.route');
const qaPlatformRoutes = require('./routes/qa-platform.route');
const fallbackController = require('./controllers/fallback.controller');

const app = express()

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: 'log'
})

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

// Enable parsing of json request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define the application port
const port = process.env.port || 3000;

// Define the application context path
const contextPath = '/';

// Register the application routes
app.use(contextPath, identityRoutes);
app.use(contextPath, qaPlatformRoutes);

// Register the swagger ui path
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Register the path not found error response 
app.use(fallbackController.get404);

// Register the express error middleware
app.use(fallbackController.errorHandler);

// Listen for incoming requests
app.listen(port, () => {
  console.log(`QA-platform app listening on port ${port}!`);
})
