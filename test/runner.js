var gent = require('../gent');
var reporter = require('../reporter/console');
var glob = require('glob');
var path = require('path');

// TODO: Remove in favor of adaptive analysis
var maxIterations = 100;

glob(process.argv[process.argv.length - 1], function(e, files) {
	files.forEach(function(file) {
		var hypotheses = require(path.resolve(file.replace(/\.js$/, '')));
		run({}, hypotheses);
	});
});

function run(options, hypotheses) {

	if(!options) {
		options = {};
	}

	options.iterations = options.iterations || maxIterations;
	options.categorize = options.categorize || gent.categorize.byTest;
	options.aggregate = options.aggregate || gent.aggregate.byCategory;

	hypotheses.forEach(function(hypthesis) {
		reporter(gent.test(hypthesis, options));
	});
}