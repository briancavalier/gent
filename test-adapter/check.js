var maxReportErrors = 10;

var gent = require('../gent');
var confidence = require('../generator/confidence');

module.exports = check;

function check(claim, options) {
	if(!options) {
		options = {};
	}

	var results = gent.test(confidence(claim, options.confidence), options);
	var handleResults = options.handleResults || defaultHandleResults;

	return handleResults(results, options);
}

// TODO: Consider extracting to another module
function defaultHandleResults(results, options) {
	var handleFailures = options.handleFailures || throwClaimError;

	return handleFailures(getFailures(results));
}

function getFailures (results) {
	return Object.keys(results).reduce(function (failures, key) {
		var category = results[key];
		if (category.fail.length) {
			failures[key] = category.fail;
		}

		return failures;
	}, {});
}

function throwClaimError(failures) {
	var keys = Object.keys(failures);
	var count = keys.length;
	if(count === 0) {
		return failures;
	}

	var msg = keys.slice(0, maxReportErrors).map(function(k) {
		var len = failures[k].length;

		var msg = failures[k].slice(0, maxReportErrors).map(function (failure) {
			var msg = JSON.stringify(failure.args);
			if (failure.error) {
				msg += ', error: ' + failure.error;
			}

			return msg;
		});

		if (len > maxReportErrors) {
			msg += ' and ' + (len - maxReportErrors) + ' more ...';
		}

		return msg;
	}).join('');


	if (count > maxReportErrors) {
		msg += '\n\t... and ' + (count - maxReportErrors) + ' more ...';
	}

	throw new ClaimFailedError(msg);
}

function ClaimFailedError(msg) {
	Error.call(this);
	this.message = msg;
	this.name = this.constructor.name;
	if(typeof Error.captureStackTrace === 'function') {
		Error.captureStackTrace(this, this.constructor);
	}
}

ClaimFailedError.prototype = Object.create(Error.prototype);
ClaimFailedError.prototype.constructor = ClaimFailedError;
