import {JerseyMysqlStorage} from '../models/jersey_mysql_storage.js'

export let jerseyController = {
    listJerseys(req, res) {
        JerseyMysqlStorage.getJerseys().then(
            result => {
                res.render('jerseys', {jerseyArray: result})
            }
        ).catch(error => {res.status(500).send(error)})
    },

    listJersey(id, res) {
        JerseyMysqlStorage.getJersey(id).then(
            result => {
                // check if object contains values
                if (Object.keys(result).length) {
                    res.render('jersey', {jersey: result[0]})
                } else {
                     res.render('404')
                }
            }
        ).catch(error => {res.status(500).send(error)})
    },
    insertJersey(club, name, number, size, year, colour, res) {
        JerseyMysqlStorage.insertJersey(club, name, number, size, year, colour).then(
            result1 => {
                JerseyMysqlStorage.getJerseys().then(
                    result2 => {
                        res.render('jerseys', {jerseyArray: result2})
                    }
                ).catch(error => {res.status(500).send(error)})
            }
        ).catch(error => {res.status(500).send(error)})
    }

}