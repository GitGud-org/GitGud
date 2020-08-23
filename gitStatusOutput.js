const { execSync } = require("child_process");
const { stat } = require("fs");

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

	let gitStatusOutputSorted = {}

	gitStatusOutputSorted.staged = gitStatusOutput.split('\n').filter(line => {
		let tag = line.slice(0,2)
		return (
			tag === 'M ' ||
			tag === 'MD' ||
			tag === 'A '
		)
	})
	.map(line => {
		return `- ${line.slice(3)} (${line.slice(0,2)})`
	})
	.join('\n')

	gitStatusOutputSorted.unstaged = gitStatusOutput.split('\n').filter(line => {
		let tag = line.slice(0,2)
		return !(
			tag === 'M ' ||
			tag === 'MD' ||
			tag === 'A '
		)
	})
	.map(line => {
		return `- ${line.slice(3)} (${line.slice(0,2)})`
	})
	.join('\n')

	return gitStatusOutputSorted;
};

module.exports = statusOutput;
