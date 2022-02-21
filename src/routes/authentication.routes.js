'use-strict'

const { logIn, logout, signUp, tokenRefresh } = require('../controllers/authentication.controller')
const { logInValidationMiddleware, signUpValidationMiddleware } = require('../middlewares/auth/auth.middleware')
// const AuthorizationMiddleware = require("../middlewares/authorization.middleware");

exports.routesConfig = (app) => {
  app.post('/api/signup', signUpValidationMiddleware, signUp)
  app.post('/api/login', logInValidationMiddleware, logIn)
  app.post('/api/token', tokenRefresh)
  app.post('/api/logout', logout)
}
