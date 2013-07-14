var next = require('./next');

module.exports = function bool(chance) {
	if(typeof chance !== 'number') {
		chance = 0.5;
	}

	return {
		next: function() {
			return { value: Math.random() < next(chance), done: false };
		}
	};
};