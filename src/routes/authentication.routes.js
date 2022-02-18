const AuthenticationController = require('../controllers/authentication.controller')
const AuthorizationMiddleware = require('../middlewares/authorization.middleware')


exports.routesConfig = (app) => {

  app.post('/api/signup', AuthenticationController.signUp);
  app.post('/api/login', AuthenticationController.logIn);
  app.post('/api/token', AuthenticationController.tokenRefresh);
  app.post('/api/logout', AuthenticationController.logout);
  
} 