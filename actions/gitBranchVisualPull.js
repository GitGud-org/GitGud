const { git } = require("./git");

module.exports = function gitBranchVisualPull(maxCommits = 20) {
	try {
		return git([
			"log", "--format=%<(240,trunc)%s", "--graph",
			"--max-count=" + maxCommits, "--ignore-missing", "HEAD"
		]).replace(/[ \t]+$/gm, "").trimEnd();
	} catch (error) {
		return "";
	}
};
