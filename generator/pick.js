var integer = require('./integer');

module.exports = function pick(list) {
	var index = integer(0, list.length >>> 0);
	return {
		next: function() {
			var value = list[index.next().value];
			return { value: value, done: false };
		}
	};
};