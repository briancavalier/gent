var gent = require('../gent');
var any = require('../generator/any');

module.exports = [
	gent.claim('is any value', function(a) {
		return Object(a) !== a;
	}, any())
];
