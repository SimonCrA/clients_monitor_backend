'use-strict'
const User = require('../models/users.model')

module.exports = {
  async findUserByEmail(_email) {
    try {
      //Check if the email already exists in the database
      const user = await User.findOne({ email: _email }).catch((_error) => {
        throw new Error(_error.message)
      })
      if (!user) {
        return {
          ok: false
        }
      }
      return user
    } catch (_error) {
      throw new Error(_error.message)
    }
  }
}
