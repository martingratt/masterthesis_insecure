import {pool} from '../db_connection.js'

export class JerseyMysqlStorage {

    static getJerseys() {
        const stmt = `Select * FROM jersey`
        return new Promise(((resolve, reject) => {
            pool.query(stmt, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        }))
    }

    // sql injection because no prepared statements :(
    static getJersey(id) {
        const stmt = `Select * FROM jersey j WHERE j.id = ` + id
        return new Promise((resolve, reject) => {
            pool.query(stmt, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        });
    }

    static insertJersey(club, name, number, size, year, colour) {
        const stmt = `Insert into jersey (club, name, number, size, year, colour) VALUES (?, ?, ?, ?, ?, ?)`
        return new Promise((resolve, reject) => {
            pool.query(stmt, [club, name, number, size, year, colour], (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        });
    }

}