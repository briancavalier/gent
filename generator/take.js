var next = require('./next');

/**
 * Return an iterator that contains at most n items from iterator
 * @param {number|{{next: Function}}} n
 * @param {{next: Function}} iterator
 * @returns {{next: Function}}
 */
module.exports = function take(n, iterator) {
	n = next(n);
	return {
		next: function() {
			n -= 1;
			return n >= 0 ? iterator.next() : { done: true, value: void 0 };
		}
	};
};