module.exports = function next(x) {
	return typeof x === 'object' && typeof x.next === 'function'
		? x.next().value : x;
};
