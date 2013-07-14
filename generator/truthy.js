var pick = require('./pick');
var number = require('./number');
var integer = require('./integer');
var string = require('./string');
var array = require('./array');

module.exports = function() {
	return pick([
		true, {}, array(), function(){}, Infinity, -Infinity,
		pick([number.positive(), number.negative()]),
		pick([integer.positive(), integer.negative()]),
		string(integer(1, 10))
	]);
};
