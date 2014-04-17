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

/**
 * Generates JSON-compliant objects and arrays
 * @param {number} size number of keys in each object or elements in each array
 * @returns {{next:function}} iterator over JSON objects & arrays
 */
function json(size) {
	return pick([jsonObject(size), jsonArray(size)]);
}

/**
 * Generates JSON-compliant objects
 * @param {number} size number of keys in each object
 * @returns {{next:function}} iterator over JSON objects
 */
function jsonObject(nkeys) {
	return object(nkeys, jsonKey(), jsonValue());
}

/**
 * Generates JSON-compliant arrays
 * @param {number} size number of elements in each array
 * @returns {{next:function}} iterator over JSON arrays
 */
function jsonArray(len) {
	return array(len, jsonValue());
}

/**
 * Generates JSON-compliant values: number, string, boolean, or null
 * @returns {{next:function}} iterator over JSON values
 */
function jsonValue() {
	return pick([number(), string(), bool(), null]);
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
	return pick([char(32, 47), char(48, 127)]);
}