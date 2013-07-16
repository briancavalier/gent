var pick = require('./pick');
var number = require('./number');
var integer = require('./integer');
var string = require('./string');

/**
 * Generates truthy values
 * @returns {true|object|array|function|}
 */
module.exports = function() {
	return pick([
		true,
		pick([integer.positive(), integer.negative()]),
		pick([number.positive(), number.negative()]),
		string(integer(1, 10)),
		pick([Infinity, -Infinity])
	]);
};
