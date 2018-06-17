const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');

const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');

const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
.then(() => console.log('Connected to mongodb'))
.catch(error => console.log(error));



app.set('view engine', 'pug');
app.set('views', './views');

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgon Enabled');
}

dbDebugger('Connected to the database');

// console.log(process.env.NODE_ENV);
// console.log(app.get('env'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());

app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

// console.log(config.get('name'));
// console.log(config.get('mail.host'));
// console.log(config.get('mail.password'));

// app.use(logger);

// PORT
const port = process.env.PORT || 9187;
app.listen(port, () => {
    console.log(`listing port ${port}`);
});