var map = require('./map');
var number = require('./number');

// See http://stackoverflow.com/questions/307179/what-is-javascripts-max-int-whats-the-highest-integer-value-a-number-can-go-t
var MAX = Math.pow(2, 53);

var reasonableMax = 1e3;

module.exports = integer;

integer.MAX = MAX;
integer.MIN = -MAX;

/**
 * Generates positive integers
 * @param {number} max generate integers < max
 * @returns {{next: Function}} integers 1 <= x < max
 */
integer.positive = function(max) {
	return generate(1, arguments.length === 0 ? reasonableMax : max);
};

/**
 * Generates negative integers
 * @param {number} min generate integers >= min
 * @returns {{next: Function}} integers min <= x <= -1
 */
integer.negative = function(min) {
	return generate(arguments.length === 0 ? -reasonableMax : min, -1);
};

/**
 * Generates integers
 * @param {number} min generate integers >= min
 * @param {number} max generate integers < max
 * @returns {{next: Function}}
 */
function integer(min, max) {
	if(arguments.length === 0) {
		min = 0;
		max = reasonableMax;
	} else if(arguments.length === 1) {
		max = min;
		min = 0;
	}

	return generate(min, max);
}

function generate(min, max) {
	return map(Math.floor, number(Math.ceil(min), max));
}