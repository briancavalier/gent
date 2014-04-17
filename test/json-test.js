var gent = require('../gent');
var json = require('../generator/json');

module.exports = [
	gent.claim('generates valid JSON', isValidJson, json())
];

function isValidJson(x) {
	return JSON.stringify(x) === JSON.stringify(JSON.parse(JSON.stringify(x)));
}