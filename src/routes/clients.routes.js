const {
  createNewClientController,
  listClientsController,
  getClientByIdController,
  UpdateClientController,
  deleteClientController
} = require('../controllers/clients.controller')

const { verifyValidJWT } = require('../middlewares/authorization.middleware')

exports.routesConfig = (app) => {
  app.post('/api/clients', [verifyValidJWT], createNewClientController)
  app.patch('/api/clients/:userId', [verifyValidJWT], UpdateClientController)
  app.get('/api/clients', [verifyValidJWT], listClientsController)
  app.get('/api/clients/:userId', [verifyValidJWT], getClientByIdController)
  app.delete('/api/clients/:userId', [verifyValidJWT], deleteClientController)
}
