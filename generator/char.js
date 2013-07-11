var integer = require('./integer');
var pick = require('./pick');

module.exports = function char(i, j) {
	var index;

	if(arguments.length === 1 && typeof i === 'string') {
		return pick(i);
	}

	if(arguments.length < 2) {
		j = 127;
	}
	if(arguments.length < 1) {
		i = 32;
	}

	index = integer(
		typeof i === 'number' ? i : i.charCodeAt(0),
		typeof j === 'number' ? j : j.charCodeAt(0)+1);

	return {
		next: function () {
			var val = index.next().value;
			return {
				done: false,
				value: String.fromCharCode(val)
			};
		}
	};
};