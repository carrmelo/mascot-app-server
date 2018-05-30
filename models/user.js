const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: false
  },
  email: {
    type: String,
    required: false
  },
  pets: [{
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
    org: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }
  }],
  location: {
    type: String,
    required: false
  },
  img: {
    data: Buffer, 
    contentType: String,
    required: false
  },
  messages: [{
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
    org: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    message: { type: String },
    alert: { type: String },
    read: { type: Boolean, default: false }
  }]
})

module.exports = mongoose.model('User', UserSchema);