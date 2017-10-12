var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.get('/hello', function(req,res) {
 res.json({data:'hello world'});
})

app.listen(5000);
