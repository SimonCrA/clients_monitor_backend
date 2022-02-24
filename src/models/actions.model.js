const mongoose = require('mongoose')

const actionsSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    required: true
  },
  action: {
    type: String,
    required: true
  },
  applied_to: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Actions', actionsSchema)
