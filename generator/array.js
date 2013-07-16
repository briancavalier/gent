var integer, any, next, take, reduce, sequence;

integer = require('./integer');
any = require('./any');
next = require('./next');
take = require('./take');
reduce = require('./reduce');
sequence = require('./sequence');

module.exports = array;

/**
 * Generates arrays
 * @param {number|{{next: Function}}} len length of each array
 * @param {{next: Function}} generator
 * @returns {{next: Function}} iterator over arrays
 */
function array(len, generator) {
	if(Array.isArray(len)) {
		generator = sequence(len);
		len = len.length;
	} else {
		if(typeof len !== 'number') {
			generator = len;
			len = integer(10);
		}
		if(typeof generator === 'undefined') {
			generator = any();
		}
	}

	return {
		next: function() {
			var a = reduce(function(a, x) {
				a.push(x);
				return a;
			}, [], take(len, generator));

			return { value: a, done: false };
		}
	};
}
