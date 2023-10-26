const express = require('express');
const router = express.Router();
const sql = require('mssql');

// Configurar a conexão com o banco de dados
const config = {
  user: 'sa',
  password: '150295',
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

// Rota para criar um novo aluno
router.post('/', async (req, res) => {
  const { Nome, Idade, NotaPrimeiroSemestre, NotaSegundoSemestre, NomeProfessor, NumeroSala } = req.body;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('Nome', sql.NVarChar, Nome)
      .input('Idade', sql.Int, Idade)
      .input('NotaPrimeiroSemestre', sql.Float, NotaPrimeiroSemestre)
      .input('NotaSegundoSemestre', sql.Float, NotaSegundoSemestre)
      .input('NomeProfessor', sql.NVarChar, NomeProfessor)
      .input('NumeroSala', sql.Int, NumeroSala)
      .query('INSERT INTO Alunos (Nome, Idade, NotaPrimeiroSemestre, NotaSegundoSemestre, NomeProfessor, NumeroSala) VALUES (@Nome, @Idade, @NotaPrimeiroSemestre, @NotaSegundoSemestre, @NomeProfessor, @NumeroSala)');
    
    res.status(201).json({ message: 'Aluno criado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar um novo aluno no banco de dados.' });
  }
});

// Outras rotas para atualizar e excluir alunos...

module.exports = router;
