var pick = require('./pick');
var take = require('./take');
var reduce = require('./reduce');

function string(len, chars) {
	if(typeof chars === 'string') {
		chars = pick(chars);
	}

	chars = take(len, chars);

	return {
		next: function() {
			return {
				done: false,
				value: reduce(function(s, c) {
					return s + c;
				}, '', chars)
			}
		}
	}
}

