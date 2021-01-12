import {JerseyMysqlStorage} from '../models/jersey_mysql_storage.js'

export let jerseyController = {
    listJerseys(req, res) {
        JerseyMysqlStorage.getJerseys().then(
            result => {res.status(200).send(result)}
        ).catch(error => {res.status(500).send(error)})
    },

    listJersey(id, res) {
        JerseyMysqlStorage.getJersey(id).then(
            result => {res.status(200).send(result)}
        ).catch(error => {res.status(500).send(error)})
    }

}