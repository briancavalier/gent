var max = Math.pow(2, 10);

module.exports = function integer(i, j) {
	if(arguments.length === 0) {
		i = 0;
		j = max;
	} else if(arguments.length === 1) {
		j = i;
		i = 0;
	}

	i = Math.ceil(i);
	j = Math.floor(j);

	if(i > j) {
		var tmp = j;
		j = i;
		i = tmp;
	}

	return {
		next: function() {
			var value = i + Math.floor(Math.random() * (j - i));
			return { value: value, done: false };
		}
	};
};