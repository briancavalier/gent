/**
 * If x is an iterator, return x.next().value, otherwise return x;
 * @param {*|{{next: Function}}} x
 * @returns {*}
 */
module.exports = function next(x) {
	return x !== null && typeof x === 'object' && typeof x.next === 'function'
		? x.next().value : x;
};
