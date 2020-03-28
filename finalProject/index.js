const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');

const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || "postgres://dbdtgkttfjxodw:14a7344321dbcb34dd2cff40f203200e5b1a23a09dfb7c14858505efaefa3694@ec2-34-206-252-187.compute-1.amazonaws.com:5432/d4m91levioidkp?ssl=true";

const pool = new Pool({ connectionString: connectionString });

var app = express();

var validate = require('./login.js');
var register = require('./register.js');
var verifyLogin = function (req, res, next) {
  if (req.session.username) {
    next();
  } else {
    req.session.error = '** Incorrect username or password';
    //res.redirect('/login');
    res.render('login', { error: req.session.error });
  }
}

app.set('port', process.env.PORT || 5001)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(express.static(__dirname + '/public'))
  .use(session({
    secret: 'do not reveal',
    resave: false,
    saveUninitialized: true
  }))


  .set('views', __dirname + '/views')
  .set('view engine', 'ejs')


  .post('/validateUser', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        console.log("Error in the hash");
        res.status(500).json({ success: false, data: err });
      }
      //console.log(hash);
    });

    var params = [username];

    var sql = 'SELECT password FROM person WHERE USER_NAME = $1::VARCHAR';
    pool.query(sql, params, function (err, result) {
      if (err || result == null) {
        console.log("Error in the pool");

        //console.log("SQL = " + sql);
        //console.log("ERR = " + err);
        //console.log("result = " + result);
        //console.log("RESULT.LENGTH = " + result.length);

        req.session.error = '** Incorrect username or password';
        return res.render('login', { error: req.session.error });
      }

      var hash = result.rows[0].password;

      bcrypt.compare(password, hash, function (err, result) {
        var json = { success: false };
        if (result) {
          json.success = true;
          req.session.username = username;
          req.session.password = password;
          return res.redirect(307, '/welcome');
        }
        else {
          return res.redirect(307, '/login');
        }
      });
    });
  })
  .post('/welcome', validate.login)
  .post('/register', register.register)
  .get('/logout', function (req, res) {
    var json = { success: false };
    if (req.session.username) {
      req.session.destroy();
      json.success = true;
      return res.redirect('/login');
    }
    return res.redirect('/welcome');
    //res.json(json);
  })

  .get('/', function (req, res) {
    res.sendFile('home_page.html', { root: __dirname + "/public" });
    console.log('We are on the Home Page');
  })

  .get('/login', function (req, res) {
    //console.log(req.session.username);
    //console.log(req.session.password);
    //console.log(req.session.error);
    req.session.error = '';
    res.render('login', { error: req.session.error });
    console.log('We are on the Login Page');
  })

  .get('/sign_up', function (req, res) {
    res.sendFile('sign_up.html', { root: __dirname + "/public" });
    console.log('We are on the Sign Up Page');
  })

  .use(verifyLogin)

  .listen(app.get('port'), function () {
    console.log('The server is up and running on port: ' + app.get('port'));
  });