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

}