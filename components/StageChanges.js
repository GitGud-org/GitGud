const React = require("react");
const { useEffect, useState } = require("react");
const { Text, Box, Newline, useFocus, useFocusManager } = require("ink");
// const SelectInput = require("ink-select-input").default;
const SelectInput = require("ink-select-input-horizontal").default;
const { execSync, exec } = require("child_process");

const StageChanges = ({refreshTab, accentColor, defaultColor}) => {
//Stages/unstages changes
	const [gitStatus, setStatus] = useState('')
	const {isFocused} = useFocus();

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


	const filesList = [{label:'STAGE/UNSTAGE (all files)', value: 'STAGE/UNSTAGE (all files)'}]

	gitStatus.split("\n").forEach((file, i) => {
		if (file.length) {
			if (file.includes(' -> ')) {
				const files = file.slice(3).split(' -> ').forEach((innerfile, j) => {
					filesList.push({label: innerfile, value: i + j * .1 })
				})

			} else {
				filesList.push({label: file.slice(3), value: i})
			}
		}
	})

	const handleSelect = (item) => {


		if (item.label === 'STAGE/UNSTAGE (all files)') {
			let gitAllFilesStatus = execSync(
				`git status -s`,
				(error, stdout, stderr) => {
					if (error) {
						console.error(`exec error: ${error}`);
						return;
					}
					return stdout;
				}
				).toString().split("\n")

				const someUnstagedFiles = gitAllFilesStatus.reduce((prev, status) => {
					return (prev || (status.length && status.slice(1,2) !== ' '))
				}, false)

				if (someUnstagedFiles) {
					execSync(`git add .`)
				} else {
					execSync('git restore --staged .')
				}
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

	return (
		<Box flexDirection="column" marginLeft='3' >
			<SelectInput displayDirection="column" items={filesList} onSelect={handleSelect} defaultColor={defaultColor} accentColor={accentColor} />
			<Newline />
			<Text color='gray'>Press ESC to go back</Text>
		</Box>
	)
};

module.exports = StageChanges;
