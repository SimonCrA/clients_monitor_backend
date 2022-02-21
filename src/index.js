'use-strict'

require('./config/env.config')

const express = require('express')
const app = express()
const morgan = require('morgan')

const bodyParser = require('body-parser')

// Import mongoose service
const mongoose = require('./services/mongoose.service')

// Import routes
const UsersRouter = require('./routes/users.routes')
const AuthorizationRouter = require('./routes/authentication.routes')

// CORS Set up
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080') // Add Frontend URL you want give access
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
  res.header('Access-control-Expose-Headers', 'Content-Length')
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-type, X-Requested-With, Range')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  } else {
    return next()
  }
})

// Dev tool set up
app.use(morgan('dev'))

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// Parse application/json
app.use(bodyParser.json())

// connect routes
UsersRouter.routesConfig(app)
AuthorizationRouter.routesConfig(app)

// connect to DB
mongoose.connectDbWithRetry()

// Server listenning on port 3000
app.listen(process.env.PORT, () => {
  console.log(`Server on Port ${process.env.PORT}`)
})
