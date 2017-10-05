var mongoose = require('mongoose');

var contactSchema = mongoose.Schema({
  phoneNumber: String,
  firstName: String,
  lastName: String
})

module.exports = mongoose.model('Contact', contactSchema)
