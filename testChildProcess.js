const { execSync } = require("child_process");
const { stat } = require("fs");

const statusOutput = () => {
	let gitStatusOutput = execSync(
		"git diff --name-only",
		(error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
			return stdout;
		}
	).toString();

	console.log(gitStatusOutput);
	return gitStatusOutput;
};

module.exports = statusOutput;
