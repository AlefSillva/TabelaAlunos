const updateAluno = async (alunoId, aluno) => {
    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input('Id', sql.Int, alunoId)
        .input('Nome', sql.NVarChar, aluno.Nome)
        .input('Idade', sql.Int, aluno.Idade)
        .input('NotaPrimeiroSemestre', sql.Float, aluno.NotaPrimeiroSemestre)
        .input('NotaSegundoSemestre', sql.Float, aluno.NotaSegundoSemestre)
        .input('NomeProfessor', sql.NVarChar, aluno.NomeProfessor)
        .input('NumeroSala', sql.Int, aluno.NumeroSala)
        .query(
          'UPDATE Alunos SET Nome = @Nome, Idade = @Idade, NotaPrimeiroSemestre = @NotaPrimeiroSemestre, NotaSegundoSemestre = @NotaSegundoSemestre, NomeProfessor = @NomeProfessor, NumeroSala = @NumeroSala WHERE Id = @Id'
        );
  
      if (result.rowsAffected[0] === 0) {
        return null; // Retorna null se o aluno não for encontrado
      }
  
      return { message: `Aluno com ID ${alunoId} atualizado com sucesso.` };
    } catch (error) {
      throw error;
    }
  };

  module.exports = updateAluno;