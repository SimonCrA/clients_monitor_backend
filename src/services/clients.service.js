'use-strict'
const Clients = require('../models/clients.model')
const bcrypt = require('bcrypt')

exports.findClientByEmailService = async (_email) => {
  try {
    //Check if the email already exists in the database
    return await Clients.findOne({ email: _email }).catch((_error) => {
      throw new Error(_error.message)
    })
  } catch (_error) {
    console.error(_error)
  }
}

exports.createNewClientService = async (_data) => {
  try {
    return await new Clients(_data).save().catch((_error) => {
      throw _error
    })
  } catch (_error) {
    throw new Error(`clientService ${_error}`)
  }
}

exports.listClientsService = async (_limit, _page) => {
  try {
    const USER_LIST = await Clients.find({ status: true })
      .select('role name lastname email')
      .limit(_limit)
      .skip(_limit * _page)
      .exec()
      .catch((_error) => {
        throw _error
      })

    const USER_COUNT = await Clients.find()
      .countDocuments({})
      .catch((_error) => {
        throw _error
      })

    return {
      count: USER_COUNT,
      data: USER_LIST
    }
  } catch (_error) {
    throw new Error(`clientService -> ${_error}`)
  }
}

exports.getCleintByIdService = async (_id) => {
  try {
    return await Clients.findById({ _id }).catch((_error) => {
      throw _error
    })
  } catch (_error) {
    throw new Error(`clientService -> ${_error}`)
  }
}

exports.updateClientService = async (_id, _data) => {
  try {
    return await Clients.findOneAndUpdate({ _id }, _data, { useFindAndModify: false }).catch((_error) => {
      throw _error
    })
  } catch (_error) {
    throw new Error(`clientService -> ${_error}`)
  }
}
