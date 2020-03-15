const express = require('express');
var app = express();

var validate = require('./login.js');

app.set('port', process.env.PORT || 5001)
  .use(express.static(__dirname + '/public')) 
  .set('views', __dirname + '/views')
  .set('view engine', 'ejs')

  .post('/validate', validate.login)

  .get('/', function(req, res) {
    res.sendFile('home_page.html', { root: __dirname + "/public"});
    console.log('We are on the Home Page');
  })

  .get('/login', function(req, res) {
    res.sendFile('login.html', { root: __dirname + "/public"});
    console.log('We are on the Login Page');
  })

  .get('/sign_up', function(req, res) {
    res.sendFile('sign_up.html', { root: __dirname + "/public"});
    console.log('We are on the Sign Up Page');
  })

  .listen(app.get('port'), function() {
  	console.log('The server is up and running on port: ' + app.get('port'));
  });