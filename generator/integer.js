var MAX, reasonableMax;

MAX = Math.pow(2, 53);
reasonableMax = 1e3;

module.exports = integer;

integer.MAX = MAX;

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
	min = Math.ceil(min);
	max = Math.floor(max);

	if(min > max) {
		var tmp = max;
		max = min;
		min = tmp;
	}

	return {
		next: function() {
			var value = min + Math.floor(Math.random() * (max - min));
			return { value: value, done: false };
		}
	};
}