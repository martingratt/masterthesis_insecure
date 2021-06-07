import mysql from 'mysql';

// hard coded credentials :(
export let pool = mysql.createPool({
    connectionLimit : 10,
    host: 'host.docker.internal',
    user: 'root',
    password: 'somewordpress',
    port: 31307,
    database: 'masterthesis'
})
