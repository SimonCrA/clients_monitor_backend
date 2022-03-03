'use-strict'
const User = require('../models/users.model')
const bcrypt = require('bcrypt')

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

exports.createNewUserService = async (_data) => {
  try {
    return await new User(_data).save().catch((_error) => {
      throw _error
    })
  } catch (_error) {
    throw new Error(`userService ${_error}`)
  }
}

exports.listUsersService = async (_limit, _page) => {
  try {
    const USER_LIST = await User.find()
      .limit(_limit)
      .skip(_limit * _page)
      .exec()
      .catch((_error) => {
        throw _error
      })
    return {
      count: await USER_LIST.count(),
      data: await USER_LIST.toArray()
    }
  } catch (_error) {
    throw new Error(`userService ${_error}`)
  }
}

exports.getUserByIdService = async (_id) => {
  try {
    return await User.findById({ _id }).catch((_error) => {
      throw _error
    })
  } catch (_error) {
    throw new Error(`userService ${_error}`)
  }
}

exports.updateUserService = async (_id, _data) => {
  try {
    return await User.findOneAndUpdate({ _id }, _data, { useFindAndModify: false }).catch((_error) => {
      throw _error
    })
  } catch (_error) {
    throw new Error(`userService ${_error}`)
  }
}
