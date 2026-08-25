const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Minha API',
    description: 'Documentação da API REST',
  },
  host: 'eventos-api-t9kw.onrender.com',
  basePath: '/api',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/*.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);