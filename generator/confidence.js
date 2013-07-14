var defaultConfidence = 0.99;

module.exports = function(generator, confidence) {

	var iterations;

	if(typeof confidence !== 'number') {
		confidence = defaultConfidence;
	}

	iterations = Math.round(1 / Math.pow(1-confidence, 2));

	return {
		next: function() {
			iterations -= 1;
			return iterations >= 0
				? generator.next()
				: { done: true };
		}
	};
};