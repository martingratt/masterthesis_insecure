import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import si from 'systeminformation';

//command execution
import {exec} from 'child_process';

// insecure deserialization
import cookieParser from 'cookie-parser';
import serialize from 'node-serialize';

// routers
import {router} from './routes/router.js'

const app = express();

// ie
app.use(cookieParser())

app.use(session({
    genid: function (req) {
        const number = Math.floor(Math.random() * 10) + 1;
        const string = number.toString();
        return string;
    },
    secret: 'masterthesis',
    name: 'loginsession'
}))

const port = process.env.APP_PORT || 8888
const __dirname = path.resolve(path.dirname(''));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', __dirname + '/views/pages');
app.set('view engine', 'ejs');
app.use('/', router);

// app.use(express.static(path.join(__dirname, 'utils')));

app.get('/knownvuln', ((req, res) => {    const queryData = req.query.name
    si.services(queryData).then((data) => {
        res.json(data);
    });
}));

app.use((req, res, next) => {res.render('404')});

app.listen(port, () =>
    console.log("Server started at port " + port)
);
