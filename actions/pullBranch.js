const { git } = require("./git");
const currentBranch = require("../currentBranch");

module.exports = () => {
	const branch = currentBranch();
	if (!branch) throw new Error("Check out a branch before you pull.");
	return git(["pull", "--", "origin", branch]);
};
