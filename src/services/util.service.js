'use-strict'
const jwt = require('jsonwebtoken')
const Token = require('../models/token.model')

exports.generateTokenService = (_userId) => {
  try {
    //Create access-token
    const accessToken = jwt.sign({ _id: _userId }, process.env.SEED_AUTH, {
      expiresIn: process.env.TOKEN_EXPIRY
    })
    //Create refresh-token
    const refreshToken = jwt.sign({ _id: _userId }, process.env.SEED_AUTH_REFRESH)

    return [accessToken, refreshToken]
  } catch (_error) {
    console.log(_error)
  }
}

exports.verifyTokenService = (_token) => {
  //Compare refresh token on server against refresh token from client
  return new Promise((resolve, reject) => {
    jwt.verify(_token, process.env.SEED_AUTH_REFRESH, (err, user) => {
      if (err) reject(err)

      const [accessToken] = module.exports.generateTokenService(user)

      resolve(accessToken)
    })
  })
}

exports.findWhitelistedTokenService = async (_token) => {
  try {
    //Check if the token already exists in the database
    return await Token.findOne({ refresh_token: _token, is_whitelisted: true }).catch((_error) => {
      throw new Error(_error.message)
    })
  } catch (_error) {
    console.error(_error)
  }
}

exports.saveTokenToWhitelistService = async (_token) => {
  try {
    return await new Token({ refresh_token: _token }).save().catch((_error) => {
      throw new Error(_error.message)
    })
  } catch (_error) {
    console.error(_error)
  }
}

exports.updateTokenStatusService = async (_token, _status) => {
  try {
    //Check if the token already exists in the database
    return await Token.findOneAndUpdate({ refresh_token: _token }, { is_whitelisted: _status }).catch((_error) => {
      throw new Error(_error.message)
    })
  } catch (_error) {
    console.error(_error)
  }
}
