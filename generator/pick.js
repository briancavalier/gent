var integer = require('./integer');
var unfold = require('./unfold');
var next = require('./next');
var slice = Array.prototype.slice;

module.exports = function pick(list) {
	if(!(arguments.length === 1 && isArrayLike(list))) {
		list = slice.call(arguments);
	}

	var index = integer(list.length);
	return unfold(function(list) {
		return [next(list[index.next().value]), list];
	}, list);
};

function isArrayLike(a) {
	return a != null && typeof a !== 'function' && typeof a.length === 'number';
}