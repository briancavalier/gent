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

		var msg = 'Claim not upheld for arguments\n';
		msg += failures[k].slice(0, maxReportErrors).map(function (failure) {
			var msg = failure.args.map(JSON.stringify).join(', ');
			return failure.error
				? msg + ', error: ' + failure.error
				: msg;

		}).join('\n');

		if (len > maxReportErrors) {
			msg += '\n... and ' + (len - maxReportErrors) + ' more ...';
		}

		return msg;
	}).join('');


	if (count > maxReportErrors) {
		msg += '\n... and ' + (count - maxReportErrors) + ' more ...';
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
