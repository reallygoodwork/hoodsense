var express = require('express'),
		app = express(),
		port = process.env.port || 5000,
		morgan = require('morgan'),
		path = require('path'),
		routes = require('./path.js');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'build')));



app.get('/', routes.home);
app.get('/api', routes.getListings);

app.listen(port);
console.log('RUNNING ON 5000 YO');