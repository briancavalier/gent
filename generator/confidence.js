var defaultConfidence = 0.975;

/**
 * Limits an iterator based on sample size confidence
 * @param {{next: Function}} generator
 * @param {number} confidence 0 < confidence < 1 used to choose number of
 *  iterations (sample size). Higher numbers require more iterations.
 * @returns {{next: Function}} iterator that contains, at most, the
 *  number of items required to reach the supplied confidence level
 */
module.exports = function(generator, confidence) {
	if(typeof confidence !== 'number') {
		confidence = defaultConfidence;
	}

	var iterations = Math.round(1 / Math.pow(1-confidence, 2));

	return {
		next: function() {
			iterations -= 1;
			return iterations >= 0
				? generator.next()
				: { done: true };
		}
	};
};