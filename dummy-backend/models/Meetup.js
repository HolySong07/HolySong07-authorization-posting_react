const mongoose = require('mongoose');

const meetupSchema = new mongoose.Schema({
  title: String,
  image: String,
  address: String,
  description: String
});

module.exports = mongoose.model('Meetup', meetupSchema);