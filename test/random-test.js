var gent = require('../gent');
var random = require('../generator/random');

module.exports = [
	gent.claim('generates 0 <= x <= 1', function(a) {
		return typeof a === 'number'
			&& a >= 0 && a <= 1;
	}, random())
];
