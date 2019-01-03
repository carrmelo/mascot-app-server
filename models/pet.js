const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  species: {
    type: String,
    required: false,
  },
  breed: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  weight: {
    type: Number,
    required: false,
  },
  size: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  adopted: { type: Boolean, default: false },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  // dates: Date,
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Pet', PetSchema);
