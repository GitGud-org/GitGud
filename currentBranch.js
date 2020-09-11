const { execSync } = require("child_process");
const { stat } = require("fs");

const gitBranchCall = () => {

	let currentBranch = execSync(
        //shows current branch
		'git branch --show-current',
		(error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
			return stdout;
		}
    ).toString();

    return currentBranch
}

module.exports = gitBranchCall;
