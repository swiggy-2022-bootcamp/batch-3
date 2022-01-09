const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swagger: '2.0',
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      title: 'Question Answering app 123',
      version: '1.0.0',
    },
    securityDefinitions: {
      BearerAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization'
      }
    },
  },
  apis: ['./routers/*.js'],
};

const openapiSpecification = swaggerJsdoc(options);
module.exports = openapiSpecification;