var next = require('./next');
var slice = Array.prototype.slice;

/**
 * Generates items by looping over the supplied array, which may
 * contain values or iterators.
 * @param {array|...object} list
 * @returns {{next: Function}}
 */
module.exports = function(list) {
	if(!(arguments.length === 1 && Array.isArray(list))) {
		list = slice.call(arguments);
	}

	var len = list.length >>> 0;
	var i = -1;

	return {
		next: function() {
			i = (i + 1) % len;
			return { done: false, value: next(list[i]) };
		}
	};
};
