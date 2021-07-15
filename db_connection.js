import mysql from 'mysql';

// hard coded credentials :(
export let pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'admin',
    password: 'k2qq5IGwSXAs9g0KwkRh',
    port: 3306,
    database: 'masterthesis'
})
