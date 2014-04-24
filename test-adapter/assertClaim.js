var gent = require('../gent');
var assertion = require('./assertion');

module.exports = assertClaim;

function assertClaim() {
	return assertion(gent.claim.apply(gent, arguments));
}
