const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Question Answering app',
      version: '1.0.0',
    },
  },
  apis: ['./routers/*.js']
};

const openapiSpecification = swaggerJsdoc(options);
module.exports = openapiSpecification;