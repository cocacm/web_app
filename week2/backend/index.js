var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Sensor = require('./models');
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost/arduino');

//app.use(express.static(__dirname));

app.post('/sensor-data/:sensorId', function(req,res) {
  const sensor = req.body;
  console.log(sensor);
  Sensor.findOneAndUpdate( { sensorId:sensor.sensorId }, sensor, {new:true, upsert:true, }, function( err, newSensor){
    if(err){
      console.log(err);
      res.json({error: 'An error occurred'})
    }else{
      res.json({success:true})
    }
  })
})

app.get('/sensor-data', function(req, res){
  Sensor.find( {}, ( err, sensors ) => {
    if(err){
      console.log(err);
      res.json({error:'An error occurred'})
    }else{
      res.json(sensors);
    }
  })
})

app.listen(3000);
