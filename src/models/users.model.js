const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let validRoles = {
  values: ['ADMIN_ROLE','USER_ROLE'],
  message: '{VALUE}, is not a valid role'
};

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  img: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: validRoles
  },

});

userSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
}

userSchema.plugin( uniqueValidator, { message: '{PATH} must be unique' } );

module.exports = mongoose.model('User', userSchema);
