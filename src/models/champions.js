const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lane: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    require: true,
  },
});
// Definindo um model no módulo global do mongoose.
const Champion = mongoose.model('Champions', schema);

module.exports = Champion;
