var pick = require('./pick');
var number = require('./number');
var integer = require('./integer');
var string = require('./string');

module.exports = function() {
	return pick([
		true, {}, [], function(){}, Infinity, -Infinity,
		number.positive(),
		number.negative(),
		integer.positive(),
		integer.negative(),
		string(integer(1, 10))
	]);
};
