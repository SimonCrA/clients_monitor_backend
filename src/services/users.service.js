'use-strict'
const User = require('../models/users.model')

exports.findUserByEmailService = async (_email) => {
  try {
    //Check if the email already exists in the database
    return await User.findOne({ email: _email }).catch((_error) => {
      throw new Error(_error.message)
    })
  } catch (_error) {
    console.error(_error)
  }
}
