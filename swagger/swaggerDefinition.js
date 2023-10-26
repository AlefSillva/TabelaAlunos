const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Alunos da Escola',
    version: '1.0.0',
    description: 'Documentação da API de Alunos da Escola',
  },
  servers: [
    {
      url: 'https://escola-kwo12kiu5-alefsillva.vercel.app/', // URL base da API (URL do Vercel)
      description: 'Servidor de Produção', // Você pode ajustar a descrição conforme necessário
    },
  ],
  paths: {
    '/alunos': {
      get: {
        summary: 'Listar alunos',
        description: 'Retorna uma lista de todos os alunos da escola.',
        responses: {
          '200': {
            description: 'Lista de alunos retornada com sucesso.',
            content: {
              'application/json': {
                example: [
                  {
                    id: 1,
                    nome: 'João',
                    idade: 18,
                    notaPrimeiroSemestre: 8.5,
                    notaSegundoSemestre: 9.0,
                    nomeProfessor: 'Prof. Silva',
                    numeroSala: 101,
                  },
                  {
                    id: 2,
                    nome: 'Maria',
                    idade: 17,
                    notaPrimeiroSemestre: 9.2,
                    notaSegundoSemestre: 8.8,
                    nomeProfessor: 'Prof. Santos',
                    numeroSala: 102,
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
};

module.exports = swaggerDefinition;
