const jwt = require('jsonwebtoken')
require('../config/env.config')

exports.verifyValidJWT = (req, res, next) => {
  if (req.headers['authorization']) {
    try {
      let authorization = req.headers['authorization'].split(' ')
      if (authorization[0] !== 'Bearer') {
        return res.status(401).json({
          ok: false,
          err: 'No autorizado, necesita un token válido.'
        })
      } else {
        req.jwt = jwt.verify(authorization[1], process.env.SEED_AUTH)
        return next()
      }
    } catch (error) {
      return res.status(401).json({
        ok: false,
        err: 'No autorizado, necesita un token válido. ' + error.message
      })
    }
  } else {
    return res.status(401).json({
      ok: false,
      err: 'Es necesario enviar un token de autenticación.'
    })
  }
}
