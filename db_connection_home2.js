import mysql from 'mysql';

// hard coded credentials :(
export let pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'maadmin',
    password: '4XC8IL1JzdcFkOImZ9fR',
    port: 3306,
    database: 'masterthesis'
})
