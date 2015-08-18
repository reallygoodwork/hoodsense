var express = require('express'),
		app = express(),
		port = process.env.port || 8080,
		morgan = require('morgan'),
		path = require('path'),
		routes = require('./path.js');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'build')));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Credentials', true);
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
  	res.header('Access-Control-Allow-Methods', 'GET');
    next();
});

app.get('/', routes.home);
app.get('/api', routes.getListings);

app.listen(port);
console.log('RUNNING ON 8080 YO');