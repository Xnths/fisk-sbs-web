require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { connection } = require('./database')
const { tables } = require('./database');
const { bulletinboard } = require('./routes');
const cors = require('cors');

connection.connect(async (error) => {
    if (error) {
        console.log(error);
    } else {
        await tables.init();

        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.text('application/text'))

        app.use('/api', bulletinboard)

        app.listen(process.env.API_PORT, () => console.log('Listening...'));
    }
})

