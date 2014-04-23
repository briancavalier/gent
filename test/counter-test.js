var gent = require('../gent');
var counter = require('../generator/counter');
var integer = require('../generator/integer');
var claim = gent.claim;

module.exports = [
	claim('generates ordinals by default', makeAssertion(1, 1), counter()),
	claim('generates counter with start and step', makeAssertion(2, 10), counter(2, 10)),
	claim('allows step generator', makeStepRangeAssertion(3, 5, 10), counter(3, integer(5, 10)))
];

function makeAssertion(start, step) {
	var last;
	return function(a) {
		var ok = typeof last === 'number' ? a === last + step : a === start;
		last = a;
		return ok;
	};
}

function makeStepRangeAssertion(start, stepLow, stepHigh) {
	var last;
	return function(a) {
		var ok = typeof last === 'number'
			? a >= last + stepLow && a < last + stepHigh
			: a === start;
		last = a;
		return ok;
	};
}