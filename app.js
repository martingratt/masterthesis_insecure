import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

const app = express();
const port = process.env.PORT || 8888
const __dirname = path.resolve(path.dirname(''));
dotenv.config();

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname + '/index.html'))
});

app.listen(port, () =>
    console.log(`Server started at port ` + port)
);