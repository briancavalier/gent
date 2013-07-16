var pick = require('./pick');
var undef;

/**
 * Generates falsy values
 * @returns {false|0|-0|null|undefined|NaN}
 */
module.exports = function() {
	return pick([false, 0, -0, '', null, undef, NaN]);
};