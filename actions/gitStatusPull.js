const { execSync } = require("child_process");

const statusOutput = () => {

	let gitStatusOutput = execSync(
		// "git diff --name-only",
		"git status -s",
		(error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
			return stdout;
		}
	).toString();
	return gitStatusOutput
}

module.exports = statusOutput;
