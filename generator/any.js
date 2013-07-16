var pick = require('./pick');
var bool = require('./bool');
var char = require('./char');
var integer = require('./integer');
var number = require('./number');
var string = require('./string');

/**
 * Generates any non-object value
 * @returns {*}
 */
module.exports = function() {
	return pick([
		bool(), char(), integer(), number(), string(), Infinity, -Infinity
	]);
};