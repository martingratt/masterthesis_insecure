import mysql from 'mysql';

// hard coded credentials :(
export let pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: '3connect2020!',
    port: 30306,
    database: 'masterthesis'
})