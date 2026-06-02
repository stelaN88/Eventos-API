const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Minha API',
    description: 'Documentação da API REST',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/*.js']; // ajuste para o caminho das suas rotas

swaggerAutogen(outputFile, endpointsFiles, doc);