module.exports = unfold;

/**
 * Generate an infinite sequence by unfolding
 * @param {function} f function that will be called with the current seed
 *  and must return the pair [value, nextSeed]
 * @param {*} seed starting seed value
 * @returns {{next:function}} iterator over unfolded values
 */
function unfold(f, seed) {
	var x = seed;
	var fn = f;
	return {
		next: function() {
			var pair = fn(x);
			if(pair === void 0) {
				return { done: true, value: void 0 };
			}

			x = pair[1];
			return { done: false, value: pair[0] };
		}
	};
}