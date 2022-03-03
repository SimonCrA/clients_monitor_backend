'use-strict'

const { logInController, logoutController, signUpController, tokenRefreshController } = require('../controllers/authentication.controller')
const { logInValidationMiddleware, signUpValidationMiddleware } = require('../middlewares/auth/auth.middleware')

exports.routesConfig = (app) => {
  app.post('/api/signup', signUpValidationMiddleware, signUpController)
  app.post('/api/login', logInValidationMiddleware, logInController)
  app.post('/api/token', tokenRefreshController)
  app.post('/api/logout', logoutController)
}
