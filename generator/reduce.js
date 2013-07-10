module.exports = function reduce(reducer, initial, generator) {
	var result, val;

	val = {};
	result = initial;

	while(true) {
		val = generator.next();

		if(val.done) {
			return result;
		}

		result = reducer(result, val.value);
	}
};
