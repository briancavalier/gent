/**
 * Given an iterator and an initial value, reduce the exhaustive
 * contents of the iterator using the supplied reducer.
 * Trying to reduce an infinite iterator will create an infinite loop.
 * @param {function} reducer
 * @param {*} initial
 * @param {{next: Function}} iterator
 * @returns {*}
 */
module.exports = function reduce(reducer, initial, iterator) {
	var result, next;

	result = initial;

	while(true) {
		next = iterator.next();

		if(next.done) {
			return result;
		}

		result = reducer(result, next.value);
	}
};
