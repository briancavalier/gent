var pick = require('./pick');
var take = require('./take');
var char = require('./char');
var integer = require('./integer');
var reduce = require('./reduce');

/**
 * Generates strings consisting of len number of segments
 * @param {number|{{next: Function}}} len number of segments
 * @param {string|{{next: Function}}} segments string containing
 *  characters, each of which is considered a segment, or an
 *  iterator over segments to use.
 * @returns {{next: Function}} iterator containing strings
 */
module.exports = function string(len, segments) {
	if(arguments.length < 2) {
		segments = char(32, 127);
	}

	if(arguments.length === 0) {
		len = integer(32);
	}

	if(typeof segments === 'string') {
		segments = pick(segments);
	}

	return {
		next: function() {
			return {
				done: false,
				value: reduce(function(s, c) {
					return s + c;
				}, '', take(len, segments))
			};
		}
	};
};

