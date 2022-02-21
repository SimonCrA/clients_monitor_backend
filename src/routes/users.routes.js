const { disableById, getById, insert, list, patchById, removeById } = require('../controllers/users.controller')
const { verifyValidJWT } = require('../middlewares/authorization.middleware')

exports.routesConfig = (app) => {
  app.post('/api/users', [verifyValidJWT], insert)
  app.patch('/api/users/:userId', [verifyValidJWT], patchById)
  app.get('/api/users', [verifyValidJWT], list)
  app.get('/api/users/:userId', [verifyValidJWT], getById)
  app.delete('/api/users/:userId', [verifyValidJWT], disableById)
  app.delete('/api/users/delete/:userId', [verifyValidJWT], removeById)
}
