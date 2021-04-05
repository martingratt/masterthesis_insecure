import {JerseyMysqlStorage} from '../models/jersey_mysql_storage.js'
import libxmljs from "libxmljs";

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
                        console.log(result2)
                        res.render('jerseys', {jerseyArray: result2})
                    }
                ).catch(error => {res.status(500).send(error)})
            }
        ).catch(error => {res.status(500).send(error)})
    },

    insertJerseyXML(jersey, res) {
        let xml = jersey

        /*
        const params =  '<?xml version="1.0" encoding="UTF-8"?>' +
        '<!DOCTYPE root [ <!ENTITY bar SYSTEM "file:///c:/windows/win.ini"> ]>' +
        '<jerseyInfo>' +
        '<club>Liverpool</club>' +
        '<name>Salah</name>' +
        '<number>&bar;</number>' +
        '<size>m</size>' +
        '<season>2020</season>>' +
        '<colour>red</colour>' +
        '</jerseyInfo>';
         */

        const xmlDoc = libxmljs.parseXml(xml, {noent: true});

        const club = xmlDoc.get('//club').text();
        const name = xmlDoc.get('//name').text();
        const number = xmlDoc.get('//number').text();
        const size = xmlDoc.get('//size').text();
        const season = xmlDoc.get('//season').text();
        const colour = xmlDoc.get('//colour').text();
        res.status(200).send(
            {
                message: 'Jersey successfully inserted!',
                club: club,
                name: name,
                number: number,
                size: size,
                season: season,
                colour: colour
            });
    },
    getJerseysByUserId(req, res) {
        const cookie = req.cookies.profile
        if (cookie) {
            const utf8encoded = (new Buffer(cookie, 'base64')).toString('utf8');
            const object = JSON.parse(utf8encoded)
            const id = object.id
            if (id) {
                JerseyMysqlStorage.getJerseyByUserId(id).then(
                    getJerseyByUserIdResult => {
                        res.render('myJerseys', {jerseyArray: getJerseyByUserIdResult})
                        console.log(getJerseyByUserIdResult)
                    }
                ).catch(error => {res.status(500).send(error)})
            } else {
                res.render('404')
            }
        } else {
            res.render('login')
        }
    }
}