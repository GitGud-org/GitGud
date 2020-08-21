const { execSync } = require("child_process");
const { stat } = require("fs");

const statusOutput = () => {
	let gitStatusOutput = execSync("git status", (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}

		return stdout;
	})
		.toString()
		.split(" ");
	// console.log("test", gitStatusOutput);
	let branch = gitStatusOutput[2];
	// console.log(branch);
	let changedFiles = gitStatusOutput.filter((elem) =>
		elem.includes("modified")
	);
	changedFiles = changedFiles.map((elem) =>
		elem.replace("modified", "").replace(/(\t:)/gm, "")
	);
	changedFiles.shift();

	console.log(changedFiles);
	return changedFiles;
};

module.exports = statusOutput;
