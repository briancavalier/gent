var next, integer;

integer = require('./integer');
next = require('./next');

module.exports = function pick(list) {
	var index = integer(list.length >>> 0);
	return {
		next: function() {
			var value = next(list[index.next().value]);
			return { value: value, done: false };
		}
	};
};