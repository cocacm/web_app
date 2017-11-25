var mongoose = require('mongoose');

var sensorSchema = mongoose.Schema({
  sensorId: Number,
  lastTime: { type: Date, default:Date.now() },
  onFire: Boolean,
  lat:Number,
  long:Number
})

module.exports = mongoose.model('Sensors', sensorSchema)
