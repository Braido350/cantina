import pkg from "pg";

const { Pool } = pkg;
if (!global.postGres) {
  global.postGres = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  });
}
console.log(global.postGres);

export default postGres;

// Exemplo de .env
// POSTGRES_USER=
// POSTGRES_HOST=
// POSTGRES_DATABASE=
// POSTGRES_PASSWORD=
// POSTGRES_PORT="
