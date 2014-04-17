var gent = require('../gent');
var json = require('../generator/json');

module.exports = [
	gent.claim('generates valid JSON', isValidJson, json()),
	gent.claim('generates objects', isObject, json.object()),
	gent.claim('generates arrays', Array.isArray, json.array()),
	gent.claim('generates valid keys', function(k) {
		var a = {};
		a[k] = 0;
		return typeof k === 'string' && k.length > 0 && isValidJson(a);
	}, json.key()),
	gent.claim('generates valid values', function(v) {
		return v === null || v === true || v === false ||
			typeof v === 'string' || typeof v === 'number';
	}, json.value())
];

function isValidJson(x) {
	return JSON.stringify(x) === JSON.stringify(JSON.parse(JSON.stringify(x)));
}

function isObject(x) {
	return x !== null && typeof x === 'object' && !Array.isArray(x);
}
