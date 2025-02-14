import express from 'express'
import { config } from 'dotenv';

const app = express();
config()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`<h1> Hello world </h1>`);
});

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});