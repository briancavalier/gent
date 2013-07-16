var reasonableMax, epsilon;

reasonableMax = 1e8;
epsilon = Number.MIN_VALUE;

module.exports = number;

number.MAX = Number.MAX_Value;
number.MIN = -Number.MAX_Value;

number.positive = function(max) {
	return generate(epsilon, arguments.length === 0 ? reasonableMax : max);
};

number.negative = function(min) {
	return generate(arguments.length === 0 ? -reasonableMax : min, -epsilon);
};

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
			var value = min + (Math.random() * (max - min));
			return { value: value, done: false };
		}
	};
}