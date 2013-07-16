var next = require('./next');

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

	return {
		next: function() {
			return { value: Math.random() < next(chance), done: false };
		}
	};
};