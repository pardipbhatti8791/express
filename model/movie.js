const Joi = require('joi');
const mongoose = require("mongoose");
const { genreSchema } = require('./genres');

const Movie = mongoose.model(
    'Movie',
    new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        genre: {
            type: genreSchema,
            required: true
        },
        numberInStock: {
            type: Number,
            required: true
        },
        dailyRentalRate: {
            type: Number
        }

    })
);

function validateMovie(movie) {
    const schema = {
      title: Joi.string().min(5).max(50).required(),
      genreId: Joi.Joi.objectId().required(),
      numberInStock: Joi.number().min(0).required(),
      dailyRentalRate: Joi.number().min(0).required()
    };
  
    return Joi.validate(movie, schema);
  }
  
  exports.Movie = Movie; 
  exports.validate = validateMovie;