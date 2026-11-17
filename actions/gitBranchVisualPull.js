const { execFileSync } = require("child_process");

module.exports = function gitBranchVisualPull() {
	try {
		return execFileSync("git", [
			"log", "--pretty=format:%s", "--graph", "--decorate", "--ignore-missing", "HEAD"
		], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
	} catch (error) {
		return "";
	}
};
