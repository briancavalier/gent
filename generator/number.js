module.exports = function integer(i, j) {
	if(arguments.length === 0) {
		i = 0;
		j = Number.MAX_VALUE;
	}
	if(arguments.length === 1) {
		j = i;
		i = 0;
	}

	if(i > j) {
		var tmp = j;
		j = i;
		i = tmp;
	}

	return {
		next: function() {
			var value = i + (Math.random() * (j - i));
			return { value: value, done: false };
		}
	};
};