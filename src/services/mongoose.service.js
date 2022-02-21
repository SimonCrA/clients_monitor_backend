const mongoose = require('mongoose')
require('../config/env.config')
let count = 0

const options = {
  autoIndex: false, // Don't build indexes
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  // all other approaches are now deprecated by MongoDB:
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}

exports.connectDbWithRetry = () => {
  console.log('MongoDB connection with retry')

  mongoose
    .connect('mongodb://localhost:27017/clientsfleetdb', options)
    .then(() => {
      console.log('MongoDB is connected')
    })
    .catch((err) => {
      console.log('MongoDb connection unsuccesful, retry after 5 seconds. ', ++count)
      setTimeout(connectDbWithRetry, 5000)
    })
}
