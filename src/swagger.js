const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Car API',
    version: '1.0.0',
    description: 'Compass Car ',
    contact: {
      name: 'Dvasconcelos',
      email: 'Dvasconcelos@compasso.com',
    },
  },
  servers: [
    {
      url: `http://${process.env.HOST}:${process.env.PORT}`,
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
module.exports = setupSwagger;
