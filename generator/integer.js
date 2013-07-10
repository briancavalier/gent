module.exports = function integer(i, j) {
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
			var value = Math.floor(i + (Math.random() * (j - i + 1)));
			return { value: value, done: false };
		}
	};
};