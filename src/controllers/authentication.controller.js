require('../config/env.config')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const User = require('../models/users.model')
const { findUserByEmailService } = require('../services/users.service')
const {
  generateTokenService,
  verifyTokenService,
  findWhitelistedTokenService,
  saveTokenToWhitelistService,
  updateTokenStatusService
} = require('../services/util.service')

exports.signUp = async (req, res) => {
  try {
    let body = req.body

    //Validations
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        err: validationErrors.mapped()
      })
    }

    //hash Password
    const hashedPassword = await bcrypt.hashSync(req.body.password, 10)

    const userData = {
      name: body.name,
      nickname: body.nickname,
      lastname: body.lastname,
      email: body.email,
      address: body.address,
      password: hashedPassword
    }
    //Create the user and generate token
    const user = await User.create(userData).catch((_error) => {
      throw new Error(`Controller ${_error.message}`)
    })

    const [accessToken, refreshToken] = generateTokenService(user._id)

    // we save the token into the white list
    const tokenWhitelisted = await saveTokenToWhitelistService(refreshToken).catch((_error) => {
      throw new Error(`Controller ${_error.message}`)
    })

    res.status(201).json({
      ok: true,
      user: user._id,
      access_token: accessToken,
      refresh_token: refreshToken
    })
  } catch (_error) {
    console.log(_error)
    res.status(500).json({
      ok: false
    })
  }
}

exports.logIn = async (req, res) => {
  try {
    let { email, password } = req.body

    //Validations
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        err: validationErrors.mapped()
      })
    }

    //Check if the email already exists in the database
    const user = await findUserByEmailService(email).catch((_error) => {
      throw new Error(`Controller ${_error.message}`)
    })

    if (!user) {
      return res.status(401).json({
        ok: false,
        err: 'Correo o clave inválida'
      })
    }

    const validPass = await bcrypt.compareSync(password, user.password)

    if (!validPass) {
      return res.status(401).json({
        ok: false,
        err: 'Correo o clave inválida'
      })
    }

    const [accessToken, refreshToken] = generateTokenService(user._id)

    // we save the token into the white list
    const tokenWhitelisted = await saveTokenToWhitelistService(refreshToken).catch((_error) => {
      throw new Error(`Controller ${_error.message}`)
    })

    res.status(202).json({
      ok: true,
      user: user._id,
      access_token: accessToken,
      refresh_token: refreshToken
    })
  } catch (_error) {
    console.log(_error)
    res.status(500).json({
      ok: false,
      message: 'Ha ocurrido un error grave'
    })
  }
}

exports.tokenRefresh = async (req, res) => {
  try {
    const { token } = req.body

    if (!token) {
      return res.status(401).json({
        ok: false,
        err: 'Sin autorización'
      })
    }

    // we save the token into the white list
    const tokenWhitelisted = await findWhitelistedTokenService(token).catch((_error) => {
      throw new Error(`Controller ${_error.message}`)
    })

    if (!tokenWhitelisted) {
      return res.status(403).json({
        ok: false,
        err: 'Token corrupto, prohibido ingresar.'
      })
    }

    const accessToken = await verifyTokenService(token).catch((_error) => {
      throw new Error(`Controller ${_error.message}`)
    })
    res.status(202).json({
      ok: true,
      access_token: accessToken,
      refresh_token: token
    })
  } catch (_error) {
    console.log(_error)
    res.status(500).json({
      ok: false,
      message: 'Ha ocurrido un error grave'
    })
  }
}

exports.logout = async (req, res) => {
  try {
    refreshTokens = await updateTokenStatusService(req.body.token, false).catch((_error) => {
      throw new Error(`Controller ${_error.message}`)
    })

    if (!refreshTokens) {
      res.status(400).json({
        ok: false,
        message: 'Ha ocurrido un problema al intenar cerrar sesión.'
      })
    }

    res.status(200).json({
      ok: true,
      message: 'Cierre de sesión exitoso.'
    })
  } catch (_error) {
    console.log(_error)
    res.status(500).json({
      ok: false,
      message: 'Ha ocurrido un error grave'
    })
  }
}
