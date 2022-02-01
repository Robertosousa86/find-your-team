const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// Definindo um model no módulo global do mongoose.
const User = mongoose.model('User', schema);

module.exports = User;
