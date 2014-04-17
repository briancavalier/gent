var integer = require('./integer');
var any = require('./any');
var take = require('./take');
var reduce = require('./reduce');
var sequence = require('./sequence');

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
		if(typeof generator === 'undefined') {
			generator = any();
		}
		if(typeof len === 'undefined') {
			len = integer(10);
		}
	}

	return {
		next: function() {
			var a = reduce(push, [], take(len, generator));
			return { value: a, done: false };
		}
	};
}

function push(a, x) {
	a.push(x);
	return a;
}
