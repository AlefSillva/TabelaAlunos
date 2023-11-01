const addAluno = async (aluno) => {
    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input('Nome', sql.NVarChar, aluno.Nome)
        .input('Idade', sql.Int, aluno.Idade)
        .input('NotaPrimeiroSemestre', sql.Float, aluno.NotaPrimeiroSemestre)
        .input('NotaSegundoSemestre', sql.Float, aluno.NotaSegundoSemestre)
        .input('NomeProfessor', sql.NVarChar, aluno.NomeProfessor)
        .input('NumeroSala', sql.Int, aluno.NumeroSala)
        .query(
          'INSERT INTO Alunos (Nome, Idade, NotaPrimeiroSemestre, NotaSegundoSemestre, NomeProfessor, NumeroSala) OUTPUT INSERTED.* VALUES (@Nome, @Idade, @NotaPrimeiroSemestre, @NotaSegundoSemestre, @NomeProfessor, @NumeroSala)'
        );
  
      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = addAluno;