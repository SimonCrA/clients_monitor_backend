const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Address = require('./address.sub_schema')

const clientsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: Number,
    required: true
  },
  router_ip: {
    type: Boolean,
    default: true
  },
  document_type: {
    type: String,
    required: false
  },
  document_number: {
    type: Number,
    required: false,
    unique: true
  },
  status: {
    type: Boolean,
    default: true
  },
  address: {
    type: Address,
    default: () => ({})
  }
})

clientsSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' })

module.exports = mongoose.model('User', clientsSchema)
