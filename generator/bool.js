var random = require('./random');
var unfold = require('./unfold');

/**
 * Generates boolean values
 * @param {number?} chance optional bias (0 <= bias <= 1). higher bias
 *  produces more true values.
 * @returns {{next: Function}} boolean iterator
 */
module.exports = function bool(chance) {
	if(typeof chance !== 'number') {
		chance = 0.5;
	}

	var r = random();

	return unfold(function(x) {
		return [r.next().value < x, x];
	}, chance);
};
