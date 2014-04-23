var integer = require('./integer');
var pick = require('./pick');
var map = require('./map');

/**
 * Generator character (string length 1) values
 * @param {string|number} i inclusive lower character or ascii code bound
 * @param {string|number} j upper character bound. If it's a string, it's
 *  inclusive, eg 'z' means include 'z'. If it's a number, it's exclusive
 * @returns {*}
 */
module.exports = function char(i, j) {
	if(arguments.length === 1 && typeof i === 'string') {
		return pick(i);
	}

	if(arguments.length < 2) {
		j = 127;
	}
	if(arguments.length === 0) {
		i = 32;
	}

	return charIterator(i, j);
};

function charIterator(i, j) {
	var index = integer(
			typeof i === 'number' ? i : i.charCodeAt(0),
			typeof j === 'number' ? j : j.charCodeAt(0)+1);

	return map(String.fromCharCode, index);
}