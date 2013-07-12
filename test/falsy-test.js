var gent = require('../gent');
var falsy = require('../generator/falsy');

module.exports = [
	gent.claim('is falsy', function (a) {
		return !a;
	}, falsy())
];