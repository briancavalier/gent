/**
 * Given an iterator, return a new iterator whose values are mapped
 * by the supplied mapper function
 * @param {function} mapper
 * @param {{next: Function}} iterator
 * @returns {{next: Function}}
 */
module.exports = function map(mapper, iterator) {
	return {
		next: function() {
			var next = iterator.next();

			return next.done
				? next
				: { done: false, value: mapper(next.value) };
		}
	};
};