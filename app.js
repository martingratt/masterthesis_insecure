import express from 'express';
import dotenv from 'dotenv';


const app = express();
dotenv.config();
const port = process.env.PORT || 8888

app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
});

app.listen(port, () =>
    console.log(`Server started at port ` + port)
);