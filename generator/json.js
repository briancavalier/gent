var integer = require('./integer');
var number = require('./number');
var string = require('./string');
var bool = require('./bool');
var char = require('./char');
var object = require('./object');
var array = require('./array');
var pick = require('./pick');

module.exports = json;
json.object = jsonObject;
json.array = jsonArray;
json.key = jsonKey;
json.value = jsonValue;
json.valueNonNull = jsonValueNonNull;

/**
 * Generates JSON-compliant objects and arrays
 * @param {number} size number of keys in each object or elements in each array
 * @param {{next:function}=} values optional values generator
 * @returns {{next:function}} iterator over JSON objects & arrays
 */
function json(size, values) {
	return pick(jsonObject(size, values), jsonArray(size, values));
}

/**
 * Generates JSON-compliant objects
 * @param {number} size number of keys in each object
 * @param {{next:function}=} values optional values generator
 * @returns {{next:function}} iterator over JSON objects
 */
function jsonObject(nkeys, values) {
	if(typeof values === 'undefined') {
		values = jsonValue();
	}
	return object(nkeys, jsonKey(), values);
}

/**
 * Generates JSON-compliant arrays
 * @param {number} size number of elements in each array
 * @param {{next:function}=} values optional values generator
 * @returns {{next:function}} iterator over JSON arrays
 */
function jsonArray(len, values) {
	if(typeof values === 'undefined') {
		values = jsonValue();
	}
	return array(len, values);
}

/**
 * Generates JSON-compliant values: number, string, boolean, or null
 * @returns {{next:function}} iterator over JSON values
 */
function jsonValue() {
	return pick(number(), string(), bool(), null);
}

/**
 * Generates JSON-compliant values except null: number, string, boolean
 * @returns {{next:function}} iterator over JSON values
 */
function jsonValueNonNull() {
	return pick(number(), string(), bool());
}

/**
 * Generates JSON-compliant key names
 * @returns {{next:function}} iterator over names
 */
function jsonKey() {
	return string(integer(1, 16), keyChars());
}

function keyChars() {
	// TODO: instead of skipping
	return char(' 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-+=~!@#$%^&*"\'[]{}()<>|?`,.');
}