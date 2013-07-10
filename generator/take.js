var next = require('./next');

module.exports = function take(generator, n) {
	n = next(n);
	return {
		next: function() {
			n -= 1;
			return n >= 0 ? generator.next() : { done: true };
		}
	};
};