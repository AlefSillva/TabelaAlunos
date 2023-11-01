const express = require('express');
const app = express();
const cors = require('cors'); // Importe o módulo CORS
const port = process.env.PORT || 3000;

// Configuração do Swagger
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('./swagger/swaggerDefinition');

// Definir a documentação Swagger
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Alunos da Escola!');
});

// Rota para a documentação Swagger
app.use('/api-docs', cors(), swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Habilitar o CORS

// Rota de alunos
const alunosRouter = require('./routes/alunos');
app.use('/alunos', alunosRouter);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

