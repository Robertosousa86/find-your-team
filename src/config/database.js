const mongoose = require('mongoose');
require('dotenv').config();

const mongodbURL = process.env.MONGODB_URL || 'localhost/test';

const connect = () => {
  mongoose.connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = {
  connect,
  connection: mongoose.connection,
};
