const { execFileSync } = require("child_process");

module.exports = function localBranches() {
	return execFileSync("git", [
		"for-each-ref", "--format=%(refname:lstrip=2)", "refs/heads/"
	], { encoding: "utf8" }).split("\n").filter(Boolean);
};
