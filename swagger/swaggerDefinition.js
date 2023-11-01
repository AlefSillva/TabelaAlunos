const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Alunos da Escola',
    version: '1.0.0',
    description: 'Documentação da API de Alunos da Escola',
  },
  servers: [
    {
      url: 'https://main--benevolent-sunburst-990b5f.netlify.app/', // Remova '/api-docs' da URL base
      description: 'Servidor de Produção',
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
      
      post: {
        summary: 'Adicionar aluno',
        description: 'Adiciona um novo aluno à escola.',
        requestBody: {
          description: 'Dados do aluno a ser adicionado.',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Aluno', // Deve corresponder ao esquema do aluno
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Aluno adicionado com sucesso.',
          },
        },
      },
      
    },
    '/alunos/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'integer',
          },
        },
      ],
      put: {
        summary: 'Atualizar aluno por ID',
        description: 'Atualiza os dados de um aluno existente com base no ID.',
        requestBody: {
          description: 'Dados do aluno a serem atualizados.',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Aluno', // Deve corresponder ao esquema do aluno
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Aluno atualizado com sucesso.',
          },
        },
      },
      get: {
        summary: 'Buscar aluno por ID',
        description: 'Retorna um aluno específico com base no ID.',
        responses: {
          '200': {
            description: 'Aluno encontrado com sucesso.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Aluno', // Deve corresponder ao esquema do aluno
                },
              },
            },
          },
          '404': {
            description: 'Aluno não encontrado.',
          },
        },
      },
      delete: {
        summary: 'Excluir aluno por ID',
        description: 'Exclui um aluno existente com base no ID.',
        responses: {
          '204': {
            description: 'Aluno excluído com sucesso.',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Aluno: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          nome: {
            type: 'string',
          },
          idade: {
            type: 'integer',
          },
          notaPrimeiroSemestre: {
            type: 'number',
          },
          notaSegundoSemestre: {
            type: 'number',
          },
          nomeProfessor: {
            type: 'string',
          },
          numeroSala: {
            type: 'integer',
          },
        },
      },
    },
  },
};

module.exports = swaggerDefinition;
