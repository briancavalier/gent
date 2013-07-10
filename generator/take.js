var next = require('./next');

module.exports = function take(n, generator) {
	n = next(n);
	return {
		next: function() {
			n -= 1;
			return n >= 0 ? generator.next() : { done: true };
		}
	};
};