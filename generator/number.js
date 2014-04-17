var random = require('./random')();

var reasonableMax = 1e8;
var epsilon = Number.MIN_VALUE;

module.exports = number;

number.MAX = Number.MAX_Value;
number.MIN = -Number.MAX_Value;

/**
 * Generates positive real numbers
 * @param {number} max generate numbers < max
 * @returns {{next: Function}} numbers Number.MIN_VALUE <= x < max
 */
number.positive = function(max) {
	return generate(epsilon, arguments.length === 0 ? reasonableMax : max);
};

/**
 * Generates negative real numbers
 * @param {number} min generate numbers >= min
 * @returns {{next: Function}} numbers min <= x <= -Number.MIN_VALUE
 */
number.negative = function(min) {
	return generate(arguments.length === 0 ? -reasonableMax : min, -epsilon);
};

/**
 * Generates real numbers
 * @param {number} min generate numbers >= min
 * @param {number} max generate numbers < max
 * @returns {{next: Function}}
 */
function number(min, max) {
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
	if(min > max) {
		var tmp = max;
		max = min;
		min = tmp;
	}

	return {
		next: function() {
			var value = min + (random.next().value * (max - min));
			return { value: value, done: false };
		}
	};
}