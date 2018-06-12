const logger = require('../middlewares/logger');
const Joi = require('joi');
const express = require('express');
const routes = express.Router();



const courses = [
    {
        id: 1,
        name: 'PHP'
    },
    {
        id: 2,
        name: 'React'
    },
    {
        id: 3,
        name: 'Node'
    }
];

/**
 * @ { Getting all the courses }
 */
routes.get('/', logger, (req, res) => {
    res.send(courses);
});

/**
 * @ { posting course data to server }
 */
routes.post('/', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) returnres.status(400).send(error.details[0].message);
    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course);
    res.send(course);
});

/**
 * @ { get single course }
 */
routes.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Not found');
    res.send(course);
});

/**
 * @ { update single course }
 */
routes.put('/:id', (req, res) => {
    // Get the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Not found');

    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update course
    course.name = req.body.name;
    res.send(course)
});

/**
 * @param {Validating Course Data} course 
 */
function validateCourse(course) {
    // Validate course
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

/**
 * @ { delete single course }
 */
routes.delete('/:id', (req, res) => {
    // Get the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(courses);
});

module.exports = routes;