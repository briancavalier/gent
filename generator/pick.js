var integer = require('./integer');

module.exports = function pick(list) {
	var index = integer(0, list.length >>> 0);
	return {
		next: function() {
			return { value: list[index.next()], done: false };
		}
	};
};