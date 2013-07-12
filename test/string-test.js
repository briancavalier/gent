var gent = require('../gent');
var string = require('../generator/string');
var integer = require('../generator/integer');

var chars = 'abcdefg';

module.exports = [
	gent.claim('generates exact length', function(s) {
		return s.length === 10;
	}, string(10, chars)),

	gent.claim('generates correct length', function(s) {
		return s.length <= 10;
	}, string(integer(10), chars)),

	gent.claim('generates strings w/o args', function(s) {
		return typeof s === 'string';
	}, string())
];
