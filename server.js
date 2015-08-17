// var express = require('express'),
// 		app = express(),
// 		port = process.env.port || 5000,
// 		morgan = require('morgan'),
// 		path = require('path'),
// 		routes = require('./path.js');

// app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, 'build')));

// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
//     res.header('Access-Control-Allow-Credentials', true);
//   	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
//   	res.header('Access-Control-Allow-Methods', 'GET');
//     next();
// });

// app.get('/', routes.home);
// app.get('/api', routes.getListings);

// app.listen(port);
// console.log('RUNNING ON 5000 YO');

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


