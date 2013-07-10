var integer = require('./integer');
var charStart = 'a'.charCodeAt(0);

module.exports = function char(i, j) {
	var index = integer(i.charCodeAt(0), j.charCodeAt(0));

	return {
		next: function() {
			return {
				done: false,
				value: String.fromCharCode(charStart + index.next())
			};
		}
	};
};