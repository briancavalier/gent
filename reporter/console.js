var lightgray  = '\u001b[22m\u001b[37m';
var cyan  = '\u001b[36m';
var red   = '\u001b[31m';
var green = '\u001b[32m';
var reset = '\u001b[0m';

module.exports = function reporter(results) {
	var failures = Object.keys(results).reduce(function(failures, key) {
		var category = results[key];
		if(category.fail.length) {
			console.error(format(category));
			failures[key] = category;
		} else {
			console.log(format(category));
		}

		return failures;
	}, {});

	return Object.keys(failures).reduce(function(failures, key) {
		var category, prefix;

		category = failures[key];
		prefix = red + '    FAILED: ' + lightgray + '[';
		category.fail.forEach(function(failure) {
			var info = prefix + JSON.stringify(failure.args) + ']' + reset;
			if(failure.error) {
				info += red + ', error: ' + failure.error + reset;
			}
			console.error(info);
		});

		return failures;
	}, failures);
};

function format(category) {
	var name, total;

	name = category.test == category.category
		? category.test
		: category.test + ': ' + category.category;

	name = lightgray + name + reset;
	total = category.fail.length + category.pass.length;

	if(category.fail.length) {
		name = red + '\u2717 ' + name;
	} else {
		name = green + '\u2713 ' + name;
	}

	return '  ' + name + cyan + ' [' + total + ' tests, '
		+ category.pass.length + ' passed, '
		+ category.fail.length + ' failed, ' + category.time + 'ms]' + reset;
}