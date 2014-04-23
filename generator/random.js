var unfold = require('./unfold');
/**
 * Default infinite random number iterator
 * @returns {{next: Function}}
 */
module.exports = function() {
	return unfold(nextValue, Math.random);
};

function nextValue(f) {
	return [f(), f];
}