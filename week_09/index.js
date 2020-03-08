const express = require('express');

var calculateRate = require('./calculateRate.js');

var app = express();

app.set('port', process.env.PORT || 5001)
  
  .use(express.static(__dirname + '/public'))
  
  .set('views', __dirname + '/views')
  
  .set('view engine', 'ejs')
  
  .get('/rates', calculateRate.getRates)

  .get('/', function(req, res) {
    res.sendFile('assign_09.html', { root: __dirname + "/public"});
  })
  
  .listen(app.get('port'), function() {
  	console.log('The server is up and running on port: ' + app.get('port'));
  });
