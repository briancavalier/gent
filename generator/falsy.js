var pick = require('./pick');
var undef;

module.exports = function() {
	return pick([false, 0, -0, '', null, undef, NaN]);
};