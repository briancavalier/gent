/**
 * Default infinite random number iterator
 * @returns {{next: Function}}
 */
module.exports = function() {
	return {
		next: function() {
			return { done: false, value: Math.random() };
		}
	};
};