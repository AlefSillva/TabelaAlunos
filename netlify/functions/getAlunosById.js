const getAlunoById = async (alunoId) => {
    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input('Id', sql.Int, alunoId)
        .query('SELECT * FROM Alunos WHERE Id = @Id');
  
      if (result.recordset.length === 0) {
        return null; // Retorna null se o aluno não for encontrado
      }
  
      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  };

  module.exports = getAlunoById;