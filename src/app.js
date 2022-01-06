const express = require('express')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../contract/QA-Platform-API-v0.0.1.json')

const identityRoutes = require('./routes/identity');
const qaPlatformRoutes = require('./routes/qa-platform');
const fallbackController = require('./controllers/fallback');

const QuestionsDao = require('./dao/questions-dao');
const UsersDao = require('./dao/users-dao');

const app = express()

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
