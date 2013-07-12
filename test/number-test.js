var gent = require('../gent');
var number = require('../generator/number');
var claim = gent.claim;

module.exports = [
	claim('generates values in range', function(a) {
		return typeof a === 'number'
			&& a >= 0 && a < 10;
	}, number(0, 10)),

	claim('generates values in range w/o lower bound', function(a) {
		return typeof a === 'number'
			&& a >= 0 && a < 10;
	}, number(10)),

	claim('generates positive numbers w/o args', function(a) {
		return typeof a === 'number' && a >= 0;
	}, number())
];
