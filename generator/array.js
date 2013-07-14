var integer, any, next;

integer = require('./integer');
any = require('./any');
next = require('./next');

module.exports = array;

function array(len, generator) {
	if(Array.isArray(len)) {
		return arrayFromArray(len);
	}

	if(typeof len !== 'number') {
		generator = len;
		len = integer(10);
	}
	if(typeof generator === 'undefined') {
		generator = any();
	}

	return {
		next: function() {
			var a, i;

			a = [];
			for(i = 0; i < len; i++) {
				a.push(next(generator));
			}

			return { value: a, done: false };
		}
	};
}

function arrayFromArray(template) {
	return {
		next: function() {
			return { value: template.map(next), done: false };
		}
	};
}

// array(3)
// array(any())
// array(3, any())
// array([...])
