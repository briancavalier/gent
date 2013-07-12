var gent = require('../gent');
var integer = require('../generator/integer');
var claim = gent.claim;

module.exports = [
	claim('generates values in range', function(a) {
		return typeof a === 'number'
			&& Math.floor(a) === a
			&& a >= 0 && a < 10;
	}, integer(0, 10)),

	claim('generates values in range', function(a) {
		return typeof a === 'number'
			&& Math.floor(a) === a
			&& a >= 0 && a < 10;
	}, integer(0, 10)),

	claim('generates values in range w/o lower bound', function(a) {
		return typeof a === 'number'
			&& Math.floor(a) === a
			&& a >= 0 && a < 10;
	}, integer(10)),

	claim('generates within inclusive exclusive bounds', function(a) {
		return a === 1;
	}, integer(1, 2)),

	claim('generates positive integers w/o args', function(a) {
		return typeof a === 'number'
			&& Math.floor(a) === a
			&& a >= 0;
	}, integer())
];
