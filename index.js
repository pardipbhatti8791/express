const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

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
]

app.get('/', (req, res) => {
    res.send('Hello gugu !!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Not found');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) returnres.status(400).send(error.details[0].message);
    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
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

app.delete('/api/courses/:id', (req, res) => {
    // Get the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(courses);
});

// PORT
const port = process.env.PORT || 9187;
app.listen(port, () => {
    console.log(`listing port ${port}`);
});