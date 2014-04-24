var gent = require('../gent');
var check = require('../test-adapter/check');
var reporter = require('../reporter/console');
var glob = require('glob');
var path = require('path');

var maxIterations = 10000;

glob(process.argv[process.argv.length - 1], function(e, files) {
	var failed = files.reduce(function(failures, file) {
		file = file.replace(/\.js$/, '');

		console.log(path.basename(file));

		var claims = require(path.resolve(file));
		return failures + run(claims);
	}, 0);

	process.exit(failed);
});

function run(claims) {
	var options = {
		iterations: maxIterations,
		categorize: gent.categorize.byTest,
		aggregate: gent.aggregate.byCategory,
		handleResults: reporter
	};

	return claims.reduce(function(failures, claim) {
		var f = check(claim, options);
		return failures + Object.keys(f).length;
	}, 0);
}