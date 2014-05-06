var unfold = require('./unfold');
var next = require('./next');

/**
 * Generates the infinite sequence of numbers:
 * start, start+step, start+(2*step), start+(3*step), ...
 * @param {number} start
 * @param {number|{next:function}} step step value or iterator of step values
 * @returns {{next:function}} iterator of numbers
 */
module.exports = function increment(start, step) {
	var i = arguments.length < 1 ? 0 : start;
	var s = arguments.length < 2 ? 1 : step;
	return unfold(function(x) {
		return [x, x+next(s)];
	}, i);
};