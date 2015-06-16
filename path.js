var Xray = require('x-ray'),
		x = Xray(),
		api = {};

api.data = [];

api.home = function(req, res) {
	res.sendFile(__dirname + '/build');
}

api.getListings = function (req, res) {
	x('http://toronto.craigslist.ca/search/apa?maxAsk=2000&bedrooms=1&query=roncesvalles#pic', 'p.row', [{
	  title: '.txt .hdrlnk',
	  link: '.txt a.hdrlnk@href',
	  posted: '.pl time@title',
	  location: '.pnr small'
	}])(function(err, obj) {
	 api.data.push(obj)
	})
	res.json(api.data);
}

module.exports = api;