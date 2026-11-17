const { git } = require("./git");

module.exports = function localBranches() {
	return git([
		"for-each-ref", "--format=%(refname:lstrip=2)", "refs/heads/"
	]).split("\n").filter(Boolean);
};
