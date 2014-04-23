var unfold = require('./unfold');

module.exports = iterate;

/**
 * Generate an infinite sequence: x, f(x), f(f(x)), etc.
 * @param {function} f function to call iteratively
 * @param {*} x starting value
 * @returns {{next:function}} infinite iterator over values
 */
function iterate(f, x) {
	return unfold(function(x) {
		return [x, f(x)];
	}, x);
}