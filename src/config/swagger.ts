import swaggerUi from 'swagger-ui-express';
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PetFinder API',
      version: '1.0.0',
      description: 'API para o sistema PetFinder'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerSetup = swaggerUi.serve;
export const swaggerDocs = swaggerUi.setup(swaggerSpec); 