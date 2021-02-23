import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

// routers
import {jerseyRouter} from './routes/jerseys.js';

const app = express();
const port = process.env.PORT || 8888
const __dirname = path.resolve(path.dirname(''));
dotenv.config();

app.set('views', __dirname + '/views/pages');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
});

app.use('/jerseys/', jerseyRouter);
app.get('/jersey')
app.get('/about', ((req, res) => res.render('about')))
app.use((req, res, next) => {res.render('404')});

app.listen(port, () =>
    console.log(`Server started at port ` + port)
);