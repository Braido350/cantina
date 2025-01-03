const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: '192.168.122.180',
  database: 'cantina',
  password: 'Braido350',
  port: 5432,
})
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res) 
  pool.end() 
})

function getComprador(){
  pool.query('SELECT * FROM cliente', (err, res) => {
      if(err){
          console.log(err);
      }else{
          console.log(res.rows);
      }
  })
}







export {pool, getComprador};