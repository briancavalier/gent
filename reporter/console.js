var red, green, reset, gray;
gray  = '\u001b[22m\u001b[37m'
red   = '\u001b[31m';
green = '\u001b[32m';
reset = '\u001b[0m';

module.exports = function reporter(results) {
	return Object.keys(results).reduce(function(failures, key) {
		var category = results[key];
		if(category.fail.length) {
			console.error(format(category));
			failures[key] = (category);
		} else {
			console.log(format(category));
		}

		return failures;
	}, {});
};

function format(category) {
	var name, total;

	name = gray + category.name + reset;
	total = category.fail.length + category.pass.length;

	if(category.fail.length) {
		name = red + '\u2717 ' + name;
	} else {
		name = green + '\u2713 ' + name;
	}

	return name + ' [' + total + ' tests, '
		+ category.pass.length + ' passed, '
		+ category.fail.length + ' failed]';
}