const express  = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.render('index', { title: 'My App', message: 'hello' });
});

module.exports = routes;