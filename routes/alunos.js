const express = require('express');
const router = express.Router();
const sql = require('mssql');

// Configurar a conexão com o banco de dados
const config = {
  user: '',
  password: '',
  server: 'localhost', // Endereço do servidor SQL
  database: 'AlunosDB',
  options: {
    trustServerCertificate: true, // Configuração de certificado (geralmente usada em ambiente de desenvolvimento)
  },
};


// Rota para listar todos os alunos
router.get('/', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Alunos');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar alunos no banco de dados.' });
  }
});

// Rota para buscar um aluno por ID
router.get('/:id', async (req, res) => {
  const alunoId = req.params.id;

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('Id', sql.Int, alunoId)
      .query('SELECT * FROM Alunos WHERE Id = @Id');
    
    if (result.recordset.length === 0) {
      res.status(404).json({ error: 'Aluno não encontrado.' });
    } else {
      res.json(result.recordset[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o aluno no banco de dados.' });
  }
});

// Rota para criar um novo aluno
router.post('/', async (req, res) => {
  // ... (código para criar um novo aluno)
});

// Rota para atualizar os dados de um aluno (PUT)
router.put('/:id', async (req, res) => {
  // ... (código para atualizar um aluno)
});

// Rota para excluir um aluno (DELETE)
router.delete('/:id', async (req, res) => {
  // ... (código para excluir um aluno)
});

module.exports = router;
