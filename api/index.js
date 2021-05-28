require('dotenv').config();

const express = require('express');
const app = express();
const { connection } = require('./database')

connection.connect(() => {

    app.listen(process.env.API_PORT, () => console.log('Listening...'));
})

