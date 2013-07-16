var next = require('./next');

/**
 * Generates items by looping over the supplied array, which may
 * contain values or iterators.
 * @param {array} array
 * @returns {{next: Function}}
 */
module.exports = function(array) {
	var len, i;

	len = array.length >>> 0;
	i = -1;

	return {
		next: function() {
			i = (i + 1) % len;
			return { done: false, value: next(array[i]) };
		}
	};
};