const mongoose = require('mongoose')

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
},
  location: {
    type: String,
    required: true
},
  email: {
    type: String,
    required: true
},
  pets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet'
  }],
  web: {
    type: String,
    required: true
  },
  logo: {
    data: Buffer, 
    contentType: String,
    required: false
  }
})

module.exports = mongoose.model('Organization', OrganizationSchema);