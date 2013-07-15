var any = require('./any');
var integer = require('./integer');
var string = require('./string');
var next = require('./next');
var reduce = require('./reduce');
var take = require('./take');

// object() -> object with random number of keys, each w/random value
// object(n) -> object with n keys, each w/random value
// object(n, values) -> object with n keys, each w/value from values generator

// object(keys, values) -> object with keys generator, values generator
module.exports = function object(nkeys, keys, values) {

	if(typeof nkeys === 'undefined') {
		nkeys = integer(10);
	}

	if(typeof values === 'undefined') {
		values = any();
	}

	if(typeof keys === 'undefined') {
		keys = string(integer(1, 16));
	}

	return {
		next: function() {
			var value = reduce(function (obj, key) {
				obj[key] = next(values);
				return obj;
			}, {}, take(nkeys, keys));

			return { done: false, value: value };
		}
	};
};