var integer = require('./integer');
var next = require('./next');

module.exports = function pick(list) {
	var index = integer(list.length);
	return {
		next: function() {
			var value = next(list[index.next().value]);
			return { value: value, done: false };
		}
	};
};