const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const addressSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  long: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  }
})

module.exports = addressSchema
