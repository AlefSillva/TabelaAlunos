const deleteAluno = async (alunoId) => {
    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input('Id', sql.Int, alunoId)
        .query('DELETE FROM Alunos WHERE Id = @Id');
  
      if (result.rowsAffected[0] === 0) {
        return null; // Retorna null se o aluno não for encontrado
      }
  
      return { message: `Aluno com ID ${alunoId} excluído com sucesso.` };
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = deleteAluno;