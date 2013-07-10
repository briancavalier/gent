module.exports = function integer(i, j) {
	if(arguments.length === 1) {
		j = i;
		i = 0;
	}

	if(j > i) {
		var tmp = j;
		j = i;
		i = tmp;
	}

	return {
		next: function() {
			return { value: Math.floor(i + (Math.random() * (j - i))), done: false };
		}
	};
};