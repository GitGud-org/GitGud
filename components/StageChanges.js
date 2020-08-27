const React = require("react");
const { useEffect, useState, useRef } = require("react");
const { Text, Box } = require("ink");
const SelectInput = require("ink-select-input").default;
const { execSync, exec } = require("child_process");

const StageChanges = ({refreshTab}) => {
	const [gitStatus, setStatus] = useState('')

	useEffect(() => {
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

		setStatus(gitStatusOutput)
	})
	const filesList = [{label:'ALL', value: 'ALL'}, {label:'NONE', value:'NONE'}]

	gitStatus.split("\n").forEach((file, i) => {
		if (file.length) {
			filesList.push({label: file.slice(3), value: i})
		}
	})

	filesList.push({label:'EXIT', value: 'EXIT'})

	const handleSelect = (item) => {
		if (item.label === 'ALL') {
			execSync(`git add .`)
		} else if (item.label === 'NONE') {
			execSync('git restore --staged .')
		} else if (item.label === 'EXIT') {
			refreshTab('')
		} else {
				let gitFileStatus = execSync(
					`git status -s ${item.label}`,
					(error, stdout, stderr) => {
						if (error) {
							console.error(`exec error: ${error}`);
							return;
						}
						return stdout;
					}
					).toString().slice(0,1);

					if (gitFileStatus === 'M' || gitFileStatus === 'A' || gitFileStatus === 'R' || gitFileStatus === 'D') {
						execSync(`git restore --staged ${item.label}`)
					} else {
						execSync(`git add ${item.label}`)
				}
		}

	};

	return <SelectInput items={filesList} onSelect={handleSelect} />
};

module.exports = StageChanges;
