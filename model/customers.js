const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
    'Customer',
    new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        isGold: {
            type: Boolean,
            required: true
        }
    })
)

function validateCustomers(genre) {
    const schema = {
      name: Joi.string()
        .min(3)
        .required(),
      phone: Joi.number().min(10).required(),
      isGold: Joi.boolean()
    };
    return Joi.validate(genre, schema);
  }

exports.Customer = Customer;
exports.validate = validateCustomers;