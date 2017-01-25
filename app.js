//require express module in the web app and assign all its properties to the variable express
var express = require('express');
//require ejs templating engine module in the web app and assign all its properties to the variable ejs
var ejs = require('ejs');
//require the dotenv module for protecting environment variables and making the app more secure
require('dotenv').config();
var app = express();
//Use Jusibe client for send SMS
var Jusibe = require('jusibe');
var jusibe = new Jusibe("b033fe3cf30d7873f208a767d26054c0", "4e07476fa37923e1980b51f05b94747b");
//use body parser to get data from the front-end
var bodyParser = require('body-parser');

//set the templating engine to ejs, so files will be rendered using the ejs engine
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//make static files available for the web app
app.use('/assets', express.static('assets'));

//set the port to be used
app.set('port',process.env.PORT);

app.listen(app.get('port'),function() {
  console.log('Proton SMS Web application is running. To terminate press Ctrl + C.');
});

app.get('/', function(req,res) {
  console.log(req.url);
  res.render('index');
  console.log(process.env.PUBLIC_KEY)
});

app.post('/', function(req,res) {
  const name = req.body.name;
  const number = req.body.number;
  const message = req.body.message;

  var payload = {
    to: number,
    from: name,
    message: message
  };

  jusibe.sendSMS(payload, function (err, res) {
    if (res.statusCode === 200)
      console.log(res.body);
    else
      console.log(err);
  });
  res.render('index');
});

app.get('/ctf', function(req,res) {
  console.log(req.url);
  res.render('ctf');
});
