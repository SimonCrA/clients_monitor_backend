'use-strict'
/** MIDDLEWARES */
const { verifyValidJWT } = require('../middlewares/authorization.middleware')
const {
  createUserValidationMiddleware,
  updateUserValidationMiddleware,
  listUsersValidationMiddleware,
  checkIdUserValidationMiddleware
} = require('../middlewares/users/users.middleware')

/** CONTROLLERS */
const {
  createNewUserController,
  listUsersController,
  getUserByIdController,
  UpdateUserController,
  deleteUserController
} = require('../controllers/users.controller')

/** ROUTES */
exports.routesConfig = (app) => {
  app.post('/api/users', [verifyValidJWT, createUserValidationMiddleware], createNewUserController)
  app.patch('/api/users/:userId', [verifyValidJWT, updateUserValidationMiddleware], UpdateUserController)
  app.get('/api/users', [verifyValidJWT, listUsersValidationMiddleware], listUsersController)
  app.get('/api/users/:userId', [verifyValidJWT, checkIdUserValidationMiddleware], getUserByIdController)
  app.delete('/api/users/:userId', [verifyValidJWT, checkIdUserValidationMiddleware], deleteUserController)
}
