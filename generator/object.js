var any = require('./any');
var integer = require('./integer');
var string = require('./string');
var next = require('./next');
var reduce = require('./reduce');
var take = require('./take');

// object() -> object with random number of string() keys, each w/any() value
// object(n) -> object with n string() keys, each w/any() value
// object(n, keys) -> object with n keys(), each w/any() value
// object(n, keys, values) -> object with n keys(), each with values() value
module.exports = object;

object.template = function(template) {
	return {
		next: function() {
			var value = Object.keys(template).reduce(function(obj, key) {
				obj[key] = next(template[key]);
				return obj;
			}, {});

			return { done: false, value: value };
		}
	};
};

function object(nkeys, keys, values) {

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
}