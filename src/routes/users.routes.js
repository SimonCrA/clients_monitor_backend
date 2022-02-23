const {
  createNewUserController,
  listUsersController,
  getUserByIdController,
  UpdateUserController,
  deleteUserController
} = require('../controllers/users.controller')
const { verifyValidJWT } = require('../middlewares/authorization.middleware')

exports.routesConfig = (app) => {
  app.post('/api/users', [verifyValidJWT], createNewUserController)
  app.patch('/api/users/:userId', [verifyValidJWT], UpdateUserController)
  app.get('/api/users', [verifyValidJWT], listUsersController)
  app.get('/api/users/:userId', [verifyValidJWT], getUserByIdController)
  app.delete('/api/users/:userId', [verifyValidJWT], deleteUserController)
}
