// middlewares import
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const pg = require('pg');
require('dotenv').config();

// cors / credentials middleware and config import
const {corsOptions} = require('./src/config/corsOptions/corsOptions');
const credentials = require('./src/middlewares/credentials/credentials');

// database & router handlers imports
const database = require('./database');
const errorHandler = require('./src/middlewares/handlers/error/handler');
const router = require('./src/router/router');




// server & port
const server = express();
const PORT = process.env.PORT;

// credentials / cors middleware
server.use(credentials);
server.use(cors(corsOptions));

// middlewares
server.use(express.urlencoded({ extended: false })); // encoded data
server.use(express.json()); // json data
server.use(morgan('dev'));
server.use(cookieParser());

// route middlewares
server.use(router);
server.use(errorHandler);


// db sinc and server up
database.sync({ force: true }).then(() => {
    console.log('Database conection successfull');
    server.listen(PORT, () => {
            console.log('server up on port ' + PORT);
    });
}).catch((err) => {
    console.log(err)
});