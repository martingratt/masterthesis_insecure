import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import bodyParser from 'body-parser';

// ie
import cookieParser from 'cookie-parser';
import escape from 'escape-html';
import serialize from 'node-serialize';
import child_process from 'child_process';

// routers
import {jerseyRouter} from './routes/jerseys.js';


const app = express();

// ie
app.use(cookieParser())

const port = process.env.APP_PORT || 8888
const __dirname = path.resolve(path.dirname(''));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views/pages');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
});

app.use('/jerseys/', jerseyRouter);
app.get('/jersey')
app.get('/addJersey', (req, res) => {
    res.render('addJersey', {test: req.query.test1})
});

// insecure deserialziation
app.get('/insecure_deserialization', function(req, res) {
        if (req.cookies.profile) {
            const str = new Buffer(req.cookies.profile, 'base64').toString();
            const obj = serialize.unserialize(str);
            if (obj.username) {
                res.render('insecureDeserialization', {username: obj.username, city: obj.city})
            }
        } else {
            res.cookie('profile', "eyJ1c2VybmFtZSI6IkFuZHJlYXMiLCJjb3VudHJ5IjoiQXVzdHJpYSIsImNpdHkiOiJWaWVubmEifQ==", {
                maxAge: 900000,
                httpOnly: true
            });
            res.render('insecureDeserialization', {username: 'Unknown', city: 'earth'})
        }

});

app.get('/about', ((req, res) => res.render('about')))
app.use((req, res, next) => {res.render('404')});

app.listen(port, () =>
    console.log(`Server started at port ` + port)
);