var map, number, MAX, reasonableMax;

map = require('./map');
number = require('./number');

// See http://stackoverflow.com/questions/307179/what-is-javascripts-max-int-whats-the-highest-integer-value-a-number-can-go-t
MAX = Math.pow(2, 53);

reasonableMax = 1e3;

module.exports = integer;

integer.MAX = MAX;
integer.MIN = -MAX;

integer.positive = function(max) {
	return generate(1, arguments.length === 0 ? reasonableMax : max);
};

integer.negative = function(min) {
	return generate(arguments.length === 0 ? -reasonableMax : min, -1);
};

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
	return map(Math.floor, number(Math.ceil(min), Math.floor(max)));
}