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
exports.number   = require('./generator/number');
exports.integer  = require('./generator/integer');
exports.bool     = require('./generator/bool');
exports.char     = require('./generator/char');
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
			var result, args;

			args = nextarray(argGenerators);
			result = { test: name, args: args };

			try {
				result.value = runOne(assertion, args);
			} catch(e) {
				result.error = e;
			}

			return { done: false, value: result };
		}
	};
}

function test(claim, options) {
	var aggregator, categorizer;

	if(!options) {
		options = {};
	}

	if(options.take) {
		claim = options.take(claim);
	} else if(typeof options.iterations === 'number') {
		claim = take(options.iterations, claim);
	}

	categorizer = options.categorize || categorize.byTest;
	aggregator = options.aggregate || aggregate.byCategory;

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
			fail: []
		};
	}

	outcome = 'value' in result && !!result.value
		? outcome.pass
		: outcome.fail;

	outcome.push(result);

	return results;
}

function runOne(check, args) {
	return check.apply(this, args);
}

function nextarray(array) {
	return array.map(next);
}
