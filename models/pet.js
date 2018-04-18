const mongoose = require('mongoose')

const PetSchema = new mongoose.Schema({
  species: {
    type: String,
    required: true
},
  breed: {
    type: String,
    required: true
},
  name: {
    type: String,
    required: true
},
  organization: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  }],
  age: {
    type: Number,
    required: true
},
  weight: {
    type: Number,
    required: true
},
  size: {
    type: String,
    required: true
},
  location: {
    type: String,
    required: true
},
  adopted: Boolean,
  owner: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }],
  dates: Date
})

module.exports = mongoose.model('Pet', PetSchema);