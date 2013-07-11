var pick = require('./pick');
var number = require('./number');
var integer = require('./integer');
var string = require('./string');

module.exports = function() {
	return pick([true, number(), integer(), string(),
		{}, [], f, Infinity, -Infinity]);
};

function f(x) { return x; }