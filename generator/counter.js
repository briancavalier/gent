var next = require('./next');

module.exports = counter;

/**
 * Generates the sequence of numbers: start, start+step, start+step+step, etc.
 * @param {number} start
 * @param {number|{next:function}} step step value or iterator of step values
 * @returns {{next:function}} iterator of start, start+step, start+step+step,
 */
function counter(start, step) {
	var i = arguments.length < 1 ? 1 : start;
	var s = arguments.length < 2 ? 1 : step;

	return {
		next: function() {
			var result = { done: false, value: i };
			i += next(s);
			return result;
		}
	};
}