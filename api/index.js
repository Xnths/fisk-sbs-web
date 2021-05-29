require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { connection } = require('./database')
const { tables } = require('./database');
const { bulletinboard } = require('./routes');

connection.connect(async (error) => {
    if (error) {
        console.log(error);
    } else {
        await tables.init();

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }))

        app.use('/api', bulletinboard)

        app.listen(process.env.API_PORT, () => console.log('Listening...'));
    }
})

