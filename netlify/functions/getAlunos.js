const getAlunos = async () => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Alunos');
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

module.exports = getAlunos;