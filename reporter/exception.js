module.exports = function(results) {
	Object.keys(results).forEach(function(key) {
		var category, total;

		category = results[key];
		total = category.fail.length + category.pass.length;

		if(category.fail.length) {
			throw new Error(category.name + ' [' + total + ' tests, '
				+ category.pass.length + ' passed, '
				+ category.fail.length + ' failed]');
		}
	});
};