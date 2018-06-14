const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: authorSchema
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.update({_id: courseId}, {
    $set: {
      'author.name': 'Gugu Bu',
      'author.bio': 'I am so cool',
      'author.website': 'https//:gpcoders.com'
    }
  });
}

//createCourse('Node Course', new Author({ name: 'Guga', 'bio': 'I am not so cool','website': 'https:gpcoders.com' }));
updateAuthor('5b21c230190f061a32f8435d');
