const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Question Answering app',
      version: '1.0.0',
    },
  },
  apis: ['./routers/*.js'],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'apiKey',
        scheme: 'bearer',
        in: 'header',
        bearerFormat: 'JWT',
      }
    }
  },
  security: [{
    BearerAuth: []
  }],
  authActions: {
    JWT: {
      name: "JWT",
      schema: {
        type:
          "apiKey",
        in: "header",
        name: "Authorization",
        description: ""
      },
      value: "Bearer "
    }
  },
  swagger: '2.0'
};

const openapiSpecification = swaggerJsdoc(options);
module.exports = openapiSpecification;