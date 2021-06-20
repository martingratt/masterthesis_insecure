import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';

// insecure deserialization
import cookieParser from 'cookie-parser';

// routers
import {router} from './routes/router.js'

const app = express();

// ie
app.use(cookieParser())

app.use(session({
    genid: function (req) {
        return (Math.floor(Math.random() * 10) + 1).toString();
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

app.use((req, res, next) => {res.render('404')});

app.listen(port, () =>
    console.log("Server started at port " + port)
);
