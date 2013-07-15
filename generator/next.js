module.exports = function next(x) {
	return x && typeof x === 'object' && typeof x.next === 'function'
		? x.next().value : x;
};
