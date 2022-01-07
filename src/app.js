const express = require('express')
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
const identityRoutes = require('./routes/identity');
const qaPlatformRoutes = require('./routes/qa-platform');
const fallbackController = require('./controllers/fallback');

// Import dao
const QuestionsDao = require('./dao/questions-dao');
const UsersDao = require('./dao/users-dao');

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

const port = 3000
const contextPath = '/'

// app.use((req, res, next) => {
//     console.log('In the middleware');
//     next();
// })

app.use(contextPath, identityRoutes);
app.use(contextPath, qaPlatformRoutes);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(fallbackController.get404);

app.listen(port, () => {
    UsersDao.init();
    QuestionsDao.init();
    console.log(`Example app listening on port ${port}!`);
})
