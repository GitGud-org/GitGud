const { execSync } = require("child_process");

const statusOutput = () => {

	//returns modified files

	let gitStatusOutput = execSync(
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
//test
