module.exports = function exception(results) {
	var failures = Object.keys(results).reduce(function(failures, key) {
		var category = results[key];
		if(category.fail.length) {
			failures = failures.concat(category.fail.map(function(failure) {
				return '[' + failure.args.join(', ') + ']';
			}));
		}

		return failures;
	}, []);

	if(failures.length) {
		throw new Error('Failed inputs: ' + failures.join(', '));
	}

	return true;
};