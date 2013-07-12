var red, green, reset, lightgray, cyan;
lightgray  = '\u001b[22m\u001b[37m';
cyan  = '\u001b[36m';
red   = '\u001b[31m';
green = '\u001b[32m';
reset = '\u001b[0m';

module.exports = function reporter(results) {
	var failures = Object.keys(results).reduce(function(failures, key) {
		var category = results[key];
		if(category.fail.length) {
			console.error(format(category));
			failures[key] = (category);
		} else {
			console.log(format(category));
		}

		return failures;
	}, {});

	return Object.keys(failures).reduce(function(failures, key) {
		var category = failures[key];
		category.fail.forEach(function(failure) {
			console.error('\tinputs: [' + JSON.stringify(failure.args) + ']');
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

	return name + cyan + ' [' + total + ' tests, '
		+ category.pass.length + ' passed, '
		+ category.fail.length + ' failed]' + reset;
}