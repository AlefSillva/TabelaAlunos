const express = require('express');
const router = express.Router();
const sql = require('mssql');

// Configurar a conexão com o banco de dados
const config = {
  server: 'Leeh-PC', // Endereço do servidor SQL
  database: 'AlunosDB',
  user: 'sa',
  password: '150295',
  options: {
    trustServerCertificate: true, //
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

// Rota para atualizar os dados de um aluno (PUT)
router.put('/:id', async (req, res) => {
  const alunoId = req.params.id;
  const { Nome, Idade, NotaPrimeiroSemestre, NotaSegundoSemestre, NomeProfessor, NumeroSala } = req.body;
  
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('Id', sql.Int, alunoId)
      .input('Nome', sql.NVarChar, Nome)
      .input('Idade', sql.Int, Idade)
      .input('NotaPrimeiroSemestre', sql.Float, NotaPrimeiroSemestre)
      .input('NotaSegundoSemestre', sql.Float, NotaSegundoSemestre)
      .input('NomeProfessor', sql.NVarChar, NomeProfessor)
      .input('NumeroSala', sql.Int, NumeroSala)
      .query('UPDATE Alunos SET Nome = @Nome, Idade = @Idade, NotaPrimeiroSemestre = @NotaPrimeiroSemestre, NotaSegundoSemestre = @NotaSegundoSemestre, NomeProfessor = @NomeProfessor, NumeroSala = @NumeroSala WHERE Id = @Id');
    
    res.json({ message: `Aluno com ID ${alunoId} atualizado com sucesso.` });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar os dados do aluno no banco de dados.' });
  }
});

// Rota para excluir um aluno (DELETE)
router.delete('/:id', async (req, res) => {
  const alunoId = req.params.id;
  
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('Id', sql.Int, alunoId)
      .query('DELETE FROM Alunos WHERE Id = @Id');
    
    res.json({ message: `Aluno com ID ${alunoId} excluído com sucesso.` });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o aluno do banco de dados.' });
  }
});

module.exports = router;
