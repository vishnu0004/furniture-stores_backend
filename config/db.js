const mysql = require('mysql2');

const pool = mysql.createPool({
  // host: 'localhost',     // Replace with your database host
  // user: 'root',          // Replace with your database user
  // password: '',  // Replace with your database password
  // database: 'furniture_store'  





    host: 'sql12.freesqldatabase.com',   // your live host
  user: 'sql12801393',                 // your live username
  password: 'KY8cyX7xJs',              // your live password
  database: 'sql12801393',             // your live database name
  port: 3306,                          // required for remote MySQL
  connectionLimit: 10                  // optional: manage connections efficiently
     
});


module.exports = pool;
