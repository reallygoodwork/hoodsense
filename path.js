var Xray = require('x-ray'),
		x = Xray(),
		api = {};

api.data = [];

api.home = function(req, res) {
	res.sendFile(__dirname + '/build');
}

api.getListings = function (req, res) {

	console.log(req.query.location);

	var location = req.query.location.replace(/\s/g, '+'),
			price = req.query.price,
			rooms = req.query.rooms;

	var clURL = 'http://toronto.craigslist.ca/search/apa?maxAsk=' + price + '&bedrooms=' + rooms + '&query=' + location + '#pic';
	var kjURL = 'http://www.kijiji.ca/b-' + rooms + '-bedroom-apartments-condos/city-of-toronto/' + location + '/k0c212l1700273?price=__' + price;


	console.log(clURL);
	function CLbuild(url) {
		x(url, 'p.row', [{
		  title: '.txt .hdrlnk',
		  link: '.txt a.hdrlnk@href',
		  posted: '.pl time@title',
		  price: '.txt .price'
		}])(function(err, obj) {
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
		 api.data.push(obj)
		});
	}

	CLbuild(clURL);
	KJbuild(kjURL);


	res.json(api.data);
}

module.exports = api;