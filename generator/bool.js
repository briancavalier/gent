var next = require('./next');

module.exports = function bool(chance) {
	return {
		next: function() {
			return { value: Math.random() < next(chance), done: false };
		}
	};
};