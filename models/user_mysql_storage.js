import {pool} from "../db_connection.js";

export const UserMysqlStorage = {
    insertUser(username, password, city) {
        const stmt = `INSERT INTO website_user (username, password, city) VALUES (?, ?, ?)`;
        return new Promise(((resolve, reject) => {
            pool.query(stmt, [username, password, city], (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        }))
    },
    getUserByUserName(username) {
        const stmt = `SELECT * FROM website_user WHERE username = ?`;
        return new Promise(((resolve, reject) => {
            pool.query(stmt, [username], (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        }))
    },
    getUserByUsernamePassword(username, hash) {
        const stmt = `SELECT * FROM website_user WHERE username = ? AND password = ?`;
        return new Promise(((resolve, reject) => {
            pool.query(stmt, [username, hash], (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        }))
    }
}