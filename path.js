var Xray = require('x-ray'),
		x = Xray(),
		api = {};

api.data = [];

api.home = function(req, res) {
	res.render('pages/index');
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

		var kjURL, clURL;
		if (location.indexOf(' ') >= 0) {
			kjURL = 'http://www.kijiji.ca/b-' + rooms + '-bedroom-apartments-condos/city-of-toronto/' + location.replace(/\s/g, '-') + '/k0c212l1700273?price=__' + price;
			clURL = 'http://toronto.craigslist.ca/search/apa?hasPic=1&maxAsk=' + price + '&bedrooms=' + rooms + '&query=' + location.replace(/\s/g, '+') + '#pic';
		} else {
			kjURL = 'http://www.kijiji.ca/b-' + rooms + '-bedroom-apartments-condos/city-of-toronto/' + location.replace('+', '-') + '/k0c212l1700273?price=__' + price;
			clURL = 'http://toronto.craigslist.ca/search/apa?maxAsk=' + price + '&bedrooms=' + rooms + '&query=' + location + '#pic';
		}

		function CLbuild(url) {
			x(url, 'p.row', [{
			  title: '.txt .hdrlnk',
			  link: '.txt a.hdrlnk@href',
			  posted: '.pl time@title',
			  price: '.txt .price',
			  pic: x('.txt a.hdrlnk@href', '.body img@src')
			}])
			(function(err, obj) {
				if (err)
					res.send(err);
					console.log(obj);
				 api.data.push(obj);
				 KJbuild(kjURL);
			});
		}

		function KJbuild(url) {
			x(url, '.regular-ad', [{
				title: '.description a.title',
				link: '.description a@href',
				posted: '.posted',
				price: '.price',
				pic: x('.description a@href', 'li.showing img@src')
			}])
			(function(err, obj) {
				if (err)
					res.send(err);
				console.log(obj)
				 api.data.push(obj)
				 var a = api.data[0];
				 var b = api.data[1];
				 var c = a.concat(b);
				 res.send(a);
			});
		}

		KJbuild(kjURL);
	}
}

module.exports = api;