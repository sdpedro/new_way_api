const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Rotas
const messageRoute = require('./routes/messageRoute');

app.use('/', messageRoute);

app.use('*', (req, res, next) => {
    res.status(404).send('ops, endereço inválido!');
});

module.exports = app;