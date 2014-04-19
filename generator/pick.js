var integer = require('./integer');
var next = require('./next');
var slice = Array.prototype.slice;

module.exports = function pick(list) {
	if(!(arguments.length === 1 && isArrayLike(list))) {
		list = slice.call(arguments);
	}

	var index = integer(list.length);

	return {
		next: function() {
			var value = next(list[index.next().value]);
			return { value: value, done: false };
		}
	};
};

function isArrayLike(a) {
	return a != null && typeof a !== 'function' && typeof a.length === 'number';
}