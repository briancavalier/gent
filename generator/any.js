var pick = require('./pick');
var truthy = require('./truthy');
var falsy = require('./falsy');

module.exports = function() {
	return pick([truthy(), falsy()]);
};