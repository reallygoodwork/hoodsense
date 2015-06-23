var Xray = require('x-ray'),
		x = Xray(),
		api = {};

api.data = [];

api.home = function(req, res) {
	res.sendFile(__dirname + '/build');
}

api.getListings = function (req, res) {
	res.contentType('application/json');
	if (api.data.length > 2) {
		api.data.length = [];
	}

	var location = req.query.location,
			price = req.query.price,
			rooms = req.query.rooms;

	if (location === undefined || price === undefined || rooms === undefined) {
		res.json({ error: 'Parameters not included'});
	} else {

		var clURL = 'http://toronto.craigslist.ca/search/apa?maxAsk=' + price + '&bedrooms=' + rooms + '&query=' + location + '#pic';
		var kjURL = 'http://www.kijiji.ca/b-' + rooms + '-bedroom-apartments-condos/city-of-toronto/' + location + '/k0c212l1700273?price=__' + price;

		function CLbuild(url) {
			x(url, 'p.row', [{
			  title: '.txt .hdrlnk',
			  link: '.txt a.hdrlnk@href',
			  posted: '.pl time@title',
			  price: '.txt .price'
			}])
			(function(err, obj) {
				if (err)
					res.send(err);
				 api.data.push(obj)
			});
		}

		function KJbuild(url) {
			x(url, '.regular-ad', [{
				title: '.description a.title',
				link: '.description a@href',
				posted: '.posted',
				price: '.price'
			}])(function(err, obj) {
			if (err)
				res.send(err);
			 api.data.push(obj)
			});
		}

		CLbuild(clURL);
		KJbuild(kjURL);
		if (api.data.length > 0) {
			var a = api.data[0];
			var b = api.data[1];
			var c = a.concat(b);
			res.jsonp(c);
		} else {
			res.jsonp({
				error: 'timeout'
			});
		};
		

	}

}

module.exports = api;