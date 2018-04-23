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
    required: true
  },
  pets: [{
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
    org: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }
  }],
  location: {
    type: String,
    required: true
  },
  img: {
    data: Buffer, 
    contentType: String,
    required: false
  }
})

module.exports = mongoose.model('User', UserSchema);