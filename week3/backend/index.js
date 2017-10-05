var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Contact = require('./models');
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost/contacts');

//app.use(express.static(__dirname));

app.get('/contacts', function(req, res){
  Contact.find( {}, ( err, contacts ) => {
    if(err){
      console.log(err);
      res.json({error:'An error occurred'})
    }else{
      res.json(contacts);
    }
  })
})

app.post('/contact/create', function(req,res) {
  console.log(req.body);
  Contact.create( req.body, function( err, newContact){
    if(err){
      console.log(err);
      res.json({error: 'An error occurred'})
    }else{
      res.json({success:true, contact:newContact})
    }
  })
})

app.put('/contact/:id', function(req,res) {
  console.log(req.body);
  Contact.findByIdAndUpdate( req.params.id, req.body, {new:true}, function( err, newContact){
    if(err){
      console.log(err);
      res.json({error: 'An error occurred'})
    }else{
      res.json({success:true, contact: newContact})
    }
  })
})

app.delete('/contact/:id', function(req, res) {
  Contact.findByIdAndRemove(req.params.id, function(err, deletedContact){
    if(err){
      console.log(err);
      res.json({error: 'An error occurred'})
    }else{
      res.json({success:true})
    }
  })
})

app.listen(3001);
