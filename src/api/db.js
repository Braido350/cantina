// Importação correta do pacote `pg` no formato ES Modules
import pkg from "pg";
const { Pool } = pkg;

// Configuração do pool de conexão com o PostgreSQL
if (!global.postGres) {
  global.postGres = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  });
}
const postGres = global.postGres;

// Função handler para API do Next.js
export default async function handler(req, res) {
  try {
    // Executando uma consulta no banco
    const result = await postGres.query("SELECT NOW()");
    res.status(200).json({ data: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
