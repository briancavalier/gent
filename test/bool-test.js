var gent = require('../gent');
var bool = require('../generator/bool');

module.exports = [
	gent.claim('generates boolean', function(b) {
		return typeof b === 'boolean';
	}, bool())
];
