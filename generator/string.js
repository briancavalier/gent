var pick = require('./pick');
var take = require('./take');
var char = require('./char');
var integer = require('./integer');
var reduce = require('./reduce');

module.exports = function string(len, segments) {
	if(arguments.length < 2) {
		segments = char(32, 127);
	}

	if(arguments.length < 1) {
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

