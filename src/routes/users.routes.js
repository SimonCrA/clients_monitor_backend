const UsersController = require('../controllers/users.controller')
const AuthorizationMiddleware = require('../middlewares/authorization.middleware')

exports.routesConfig = (app) => {

  app.post('/api/users',[
    AuthorizationMiddleware.verifyValidJWT
  ], UsersController.insert)
  app.patch('/api/users/:userId',[
    AuthorizationMiddleware.verifyValidJWT
  ], UsersController.patchById)
  app.get('/api/users',[
    AuthorizationMiddleware.verifyValidJWT
  ], UsersController.list)
  app.get('/api/users/:userId',[
    AuthorizationMiddleware.verifyValidJWT
  ], UsersController.getById)
  app.delete('/api/users/:userId',[
    AuthorizationMiddleware.verifyValidJWT
  ], UsersController.disableById)
  app.delete('/api/users/delete/:userId',[
    AuthorizationMiddleware.verifyValidJWT
  ], UsersController.removeById)
  
}