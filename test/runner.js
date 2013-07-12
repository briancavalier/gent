var gent = require('../gent');
var reporter = require('../reporter/console');
var glob = require('glob');
var path = require('path');

// TODO: Remove in favor of adaptive analysis
var maxIterations = 100;

glob(process.argv[process.argv.length - 1], function(e, files) {
	files.forEach(function(file) {
		file = file.replace(/\.js$/, '');

		console.log(path.basename(file));

		var claims = require(path.resolve(file));
		run(claims, {});
	});
});

function run(claims, options) {

	if(!options) {
		options = {};
	}

	options.iterations = options.iterations || maxIterations;
	options.categorize = options.categorize || gent.categorize.byTest;
	options.aggregate = options.aggregate || gent.aggregate.byCategory;

	claims.forEach(function(claim) {
		reporter(gent.test(claim, options));
	});
}