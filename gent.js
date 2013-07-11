var bind = Function.prototype.bind;
var uncurryThis = bind.bind(bind.call);
var slice = uncurryThis([].slice);

var reduce = require('./generator/reduce');
var take = require('./generator/take');
var next = require('./generator/next');

exports.run = runner;
exports.test = test;
exports.aggregator = aggregator;

exports.integer = require('./generator/integer');
exports.char = require('./generator/char');
exports.string = require('./generator/string');
exports.pick = require('./generator/pick');

exports.take = take;
exports.next = next;

function runner(report, aggregate, test) {
	return report(reduce(aggregate, {}, test));
}

function test(name, check) {
	var generators = slice(arguments, 2);

	return {
		next: function() {
			var result, args;
			args = nextarray(generators);
			try {
				result = { name: name, args: args, value: run(check, args) };
			} catch(e) {
				result = { name: name, args: args, error: e };
			}

			return { done: false, value: result };
		}
	};
}

function aggregator(categorize) {
	if(typeof categorize !== 'function') {
		categorize = defaultCategorizer;
	}

	return function(results, result) {
		var category, outcome;

		category = categorize.call(this, result);
		outcome = results[category];

		if(!outcome) {
			outcome = results[category] = {
				name: category,
				test: result.name,
				pass: [],
				fail: []
			};
		}

		outcome = 'value' in result && !!result.value
			? outcome.pass
			: outcome.fail;

		outcome.push(result);

		return results;
	};
}

function run(check, args) {
	return check.apply(this, args);
}

function nextarray(array) {
	return array.map(next);
}

function defaultCategorizer(result) {
	return result.name;
}