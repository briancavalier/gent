var gent = require('../gent');
var any = require('../generator/any');

module.exports = [
	gent.claim('is anything', function(a) {
		return arguments.length === 1 && (a || !a);
	}, any())
];
