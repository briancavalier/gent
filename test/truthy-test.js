var gent = require('../gent');
var truthy = require('../generator/truthy');

module.exports = [
	gent.claim('is truthy', function(a) {
		return !!a;
	}, truthy())
];
