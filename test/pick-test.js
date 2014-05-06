var gent = require('../gent');
var pick = require('../generator/pick');

var array = [1, 2, 3, 4, 5];
var string = 'abcdefg';

module.exports = [
	gent.claim('picks from array', function(a, array) {
		return array.indexOf(a) >= 0;
	}, pick(array), array),

	gent.claim('picks from arguments', function(a, array) {
		return array.indexOf(a) >= 0;
	}, pick.apply(void 0, array), array),

	gent.claim('picks from string', function(a, string) {
		return typeof a === 'string'
			&& a.length === 1 && string.indexOf(a) >= 0;
	}, pick(string), string)
];
