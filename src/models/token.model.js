const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const tokenSchema = new mongoose.Schema({
  refresh_token: {
    type: String,
    required: true,
    unique: true
  },
  create_date: {
    type: Date,
    required: true,
    default: Date.now()
  },
  is_whitelisted: {
    type: Boolean,
    default: true
  }
})

tokenSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' })

module.exports = mongoose.model('Token', tokenSchema)
