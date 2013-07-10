var next = require('./next');

module.exports = function(array) {
	var len, i;

	len = array.length >>> 0;
	i = 0;

	return {
		next: function() {
			return i < len
				? { done: false, value: next(array[i++]) }
				: { done: true };
		}
	};
};