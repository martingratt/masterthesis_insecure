import express from 'express';
import {frontendController} from '../controllers/frontend_controller.js'
import {UserMysqlStorage} from "../models/user_mysql_storage.js";
import path from "path";

let frontendRouter = express.Router();

const __dirname = path.resolve(path.dirname(''));

frontendRouter.get('/command_execution', (req, res) => {frontendController.commendExecution(req, res)})
//login
frontendRouter.get('/', (req, res) => {frontendController.login(req, res)});
//logout
frontendRouter.get('/logout', (req, res) => {frontendController.logout(req, res)});
// about
frontendRouter.get('/about', ((req, res) => res.render('about')))
// home
frontendRouter.get('/home', (req, res) => res.render('index'));
// add jersey
frontendRouter.get('/addJersey', (req, res) => {
    res.render('addJersey', {userInput: req.query.userInput, title: 'Add jersey'})
});

frontendRouter.get('/addJersey1', (req, res) => {res.sendFile(__dirname + '/views/pages/addJersey.html')})
frontendRouter.get('/ping', ((req, res) => res.sendFile(__dirname + '/views/pages/ping.html')))
frontendRouter.get('/register', (req, res) => res.render('register'));

// insecure deserialziation
frontendRouter.get('/insecure_deserialization',(req, res) => frontendController.insecureDeserialization(req, res));

// path traversal
frontendRouter.get('/terms_and_conditions', (req, res) => {
    res.sendFile(__dirname + '/views/pages/path_traversal.html')
})

frontendRouter.get('/path_traversal', (req, res) => frontendController.pathTraversal(req, res))

// XML External Entity
frontendRouter.get('/xxe', (req, res) => {
    res.sendFile(__dirname + '/views/pages/addJerseyXML.html')
})

frontendRouter.get('/admin', (req, res) => {
    const cookie = req.cookies.profile
    if (cookie) {
        const utf8encoded = (new Buffer(cookie, 'base64')).toString('utf8');
        const object = JSON.parse(utf8encoded)
        const role = object.role
        if (role === 2) {
            UserMysqlStorage.getUsers().then(
                getUsersResult => {
                    res.render('userControl', {userArray: getUsersResult});
                }
            )
        } else {
            res.status(401).render('unauthorized');
        }
    } else {
        res.status(401).render('unauthorized');
    }
})

frontendRouter.get('/knownvuln', ((req, res) => frontendController.knownVuln(req, res)));



frontendRouter.get('/about', ((req, res) => res.render('about')))

frontendRouter.get('/loginsession', ((req, res) => res.render('loginSession')))

frontendRouter.get('/loginjwt', ((req, res) => res.render('loginJWT')))


export {frontendRouter}