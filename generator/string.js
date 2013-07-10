var pick = require('./pick');
var take = require('./take');
var reduce = require('./reduce');

module.exports = function string(len, segments) {
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

