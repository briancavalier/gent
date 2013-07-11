var next = require('./next');

module.exports = function(array) {
	var len, i;

	len = array.length >>> 0;
	i = -1;

	return {
		next: function() {
			i = (i + 1) % len;
			return { done: false, value: next(array[i]) };
		}
	};
};