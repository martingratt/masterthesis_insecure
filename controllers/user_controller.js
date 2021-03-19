import {UserMysqlStorage} from "../models/user_mysql_storage.js";
import crypto from 'crypto';

export let userController = {
    insertUser(res, req) {
        const username = req.body.username;
        const password = req.body.password;
        const city = req.body.city;
        const hash = crypto.createHash('md5').update(password).digest('hex');
        UserMysqlStorage.getUserByUserName(username).then(
            getUserByUserNameResult => {
                if (Object.keys(getUserByUserNameResult).length !== 0) {
                    res.render('register')
                } else {
                    UserMysqlStorage.insertUser(username, hash, city).then(
                        result => {
                            res.render('login')
                        }
                    ).catch(error => res.status(500).send(error))
                }
            }
        )
    },
    getUser(res, req) {
        const username = req.body.username;
        const password = req.body.password;
        const hash = crypto.createHash('md5').update(password).digest('hex');
        UserMysqlStorage.getUserByUsernamePassword(username, hash).then(
            getUserByUsernamePasswordResult => {
                if (Object.keys(getUserByUsernamePasswordResult).length === 1) {
                    const cookie = {
                        "username": getUserByUsernamePasswordResult[0].username,
                        "city": getUserByUsernamePasswordResult[0].city
                    }
                    let objJsonStr = JSON.stringify(cookie);
                    let objJsonB64 = Buffer.from(objJsonStr).toString("base64");
                    res.cookie('profile', objJsonB64, {
                        maxAge: 900000,
                        httpOnly: true
                    });
                    res.render('index');
                } else {
                    // delete the profile cookie from the users browser
                    res.clearCookie('profile');
                    res.render('login')
                }
            }).catch(error => res.status(500).send(error))
    }
}