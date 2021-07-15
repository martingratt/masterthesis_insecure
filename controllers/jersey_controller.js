import {JerseyMysqlStorage} from '../models/jersey_mysql_storage.js'
import libxmljs from "libxmljs";
import jwt from 'jsonwebtoken';

export let jerseyController = {
    listJerseys(req, res) {
        JerseyMysqlStorage.getJerseys().then(
            result => {
                res.render('jerseys', {jerseyArray: result})
            }
        ).catch(error => {res.status(500).render('error')})
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
        ).catch(error => {res.status(500).render('error')})
    },
    insertJersey(req, club, name, number, size, year, colour, res) {
        const cookie = req.cookies.profile
        if (cookie) {
            const utf8encoded = (new Buffer(cookie, 'base64')).toString('utf8');
            const object = JSON.parse(utf8encoded)
            const id = object.id
            JerseyMysqlStorage.insertJersey(club, name, number, size, year, colour, id).then(
                result1 => {
                    JerseyMysqlStorage.getJerseys().then(
                        result2 => {
                            res.render('jerseys', {jerseyArray: result2})
                        }
                    ).catch(error => {res.status(500).render('error')})
                }
            ).catch(error => {res.status(500).render('error')})
        } else {
            res.render('login')
        }
    },

    insertJerseyXML(req, res) {
        try {
            const cookie = req.cookies.profile
            if (cookie) {
                const utf8encoded = (new Buffer(cookie, 'base64')).toString('utf8');
                const object = JSON.parse(utf8encoded)
                const id = object.id
                let xml = req.body.xml
                const xmlDoc = libxmljs.parseXml(xml, {noent: true});
                const club = xmlDoc.get('//club').text();
                const name = xmlDoc.get('//name').text();
                const number = xmlDoc.get('//number').text();
                const size = xmlDoc.get('//size').text();
                const colour = xmlDoc.get('//colour').text();
                const year = xmlDoc.get('//year').text();
                JerseyMysqlStorage.insertJersey(club, name, number, size, year, colour, id).then(
                    result1 => {
                        JerseyMysqlStorage.getJerseys().then(
                            result2 => {
                                res.status(200).send(
                                    {
                                        message: 'Jersey successfully inserted!',
                                        club: club,
                                        name: name,
                                        number: number,
                                        size: size,
                                        colour: colour,
                                        year: year
                                    });
                            }
                        ).catch(error => {res.status(500).render('error')})
                    }
                ).catch(error => {res.status(500).render('error')})
            } else {
                res.render('login')
            }
        } catch (e) {
            res.render('error')
        }
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
                    }
                ).catch(error => {res.status(500).render('error')})
            } else {
                res.render('404')
            }
        } else {
            res.render('login')
        }
    },
    getJerseysByUserIdSession(req, res) {
        if (req.session.userId) {
            JerseyMysqlStorage.getJerseyByUserId(req.session.userId).then(
                getJerseyByUserIdResult => {
                    res.render('myJerseys', {jerseyArray: getJerseyByUserIdResult})
                }).catch(error => {res.status(500).render('error')})
        } else {
            res.render('loginSession')
        }
    },
    getJerseysByUserIdJWT(req, res) {
        const jwttoken = req.cookies.jwt;
        const decoded = jwt.decode(jwttoken)
        if (decoded) {
            const id = decoded.id
            JerseyMysqlStorage.getJerseyByUserId(id).then(
                getJerseyByUserIdResult => {
                    res.render('myJerseys', {jerseyArray: getJerseyByUserIdResult})
                }).catch(error => {res.status(500).render('error')})
        } else {
            res.render('loginJWT')
        }
    }
}
