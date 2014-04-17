var gent = require('../gent');
var reporter = require('../reporter/console');
var glob = require('glob');
var path = require('path');
var confidence = require('../generator/confidence');

var maxIterations = 10000;

glob(process.argv[process.argv.length - 1], function(e, files) {
	var failed = files.reduce(function(failures, file) {
		file = file.replace(/\.js$/, '');

		console.log(path.basename(file));

		var claims = require(path.resolve(file));
		return failures + run(claims, {});
	}, 0);

	process.exit(failed);
});

function run(claims, options) {
	if(!options) {
		options = {};
	}

	options.iterations = options.iterations || maxIterations;
	options.categorize = options.categorize || gent.categorize.byTest;
	options.aggregate = options.aggregate || gent.aggregate.byCategory;

	return claims.reduce(function(failures, claim) {
		var f = reporter(gent.test(confidence(claim, options.confidence), options));
		return failures + Object.keys(f).length;
	}, 0);
}