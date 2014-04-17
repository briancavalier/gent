var bind = Function.prototype.bind;
var uncurryThis = bind.bind(bind.call);
var slice = uncurryThis([].slice);

var take = require('./generator/take');
var next = require('./generator/next');
var reduce = require('./generator/reduce');

exports.claim = claim;
exports.test = test;
exports.categorize = categorize;
exports.categorize.byTest = categorize.bind(void 0, categorizeByTest);
exports.categorize.byArgs = categorize.bind(void 0, categorizeByArgs);

exports.aggregate = aggregate;
exports.aggregate.byCategory = aggregate.bind(void 0, aggregateByCategory);

exports.any      = require('./generator/any');
exports.truthy   = require('./generator/truthy');
exports.falsy    = require('./generator/falsy');

exports.array    = require('./generator/array');
exports.bool     = require('./generator/bool');
exports.char     = require('./generator/char');
exports.integer  = require('./generator/integer');
exports.number   = require('./generator/number');
exports.object   = require('./generator/object');
exports.string   = require('./generator/string');

exports.sequence = require('./generator/sequence');
exports.pick     = require('./generator/pick');

exports.take     = take;
exports.next     = next;
exports.reduce   = reduce;

var claimId = 0;

function claim() {

	var args, name, assertion, argGenerators;

	args = slice(arguments);
	name = args[0];

	if(typeof name != 'string') {
		args.unshift('claim ' + claimId);
		claimId += 1;
	}

	name = args[0];
	assertion = args[1];
	argGenerators = args.slice(2);

	return {
		next: function() {
			var args = nextarray(argGenerators);
			var result = { test: name, args: args, value: void 0, error: void 0, time: 0 };
			var start = Date.now();

			tryClaim(assertion, args, result);

			result.time = Date.now() - start;

			return { done: false, value: result };
		}
	};
}

function tryClaim(assertion, args, outResult) {
	try {
		outResult.value = runOne(assertion, args);
	} catch(e) {
		outResult.error = e;
	}
}

function test(claim, options) {
	/*jshint maxcomplexity:6*/
	if(!options) {
		options = {};
	}

	var categorizer = options.categorize || categorize.byTest;
	var aggregator = options.aggregate || aggregate.byCategory;

	if(typeof options.take === 'function') {
		claim = options.take(claim);
	} else if(typeof options.iterations === 'number') {
		claim = take(options.iterations, claim);
	}

	return aggregator(categorizer(claim));
}

function categorize(categorizer, test) {
	return {
		next: function() {
			var result = test.next();

			if(!result.done) {
				result.value.category = categorizer(result.value);
			}

			return result;
		}
	};
}

function categorizeByTest(result) {
	return result.test;
}

function categorizeByArgs(result) {
	return result.args.join(', ');
}

function aggregate(aggregator, test) {
	var into = arguments.length > 2 ? arguments[2] : {};

	return reduce(function(results, result) {
		results = aggregator(results, result);
		return results;
	}, into, test);
}

function aggregateByCategory(results, result) {
	var category, outcome;

	category = result.category || result.test;
	outcome = results[category];

	if(!outcome) {
		outcome = results[category] = {
			category: category,
			test: result.test,
			pass: [],
			fail: [],
			time: 0
		};
	}

	outcome.time += result.time;
	var outcomeType = result.error == null && result.value ? outcome.pass : outcome.fail;

	outcomeType.push(result);

	return results;
}

function runOne(check, args) {
	return check.apply(this, args);
}

function nextarray(array) {
	return array.map(next);
}
