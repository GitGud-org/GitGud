const React = require("react");
const { useState } = require("react");
const { render, Box, Text, Newline } = require("ink");
const { execSync } = require("child_process");
const TextInput = require("ink-text-input").default;

const DeleteTab = (props) => {
	//Uses git branch and displays all local branches
	//Takes in an input to for delete branch

	const [del, setDelete] = useState("");

	let { refreshTab } = props;

	let branchList = execSync("git branch").toString().split("\n");
	let branches = branchList;

	const handleSubmit = () => {
		try {
			execSync("git branch -D " + del + "");
			refreshTab("");
		} catch (error) {}
	};
	return (
		<Box flexDirection="column">
			<Box>
				<Text> </Text>
			</Box>
			<Box>
				<Text color="red"> Branches: </Text>
				<Text>{branches.join(" ")}</Text>
			</Box>
			<Box>
				<Box>
					<Text color="red"> Delete Branch: </Text>
					<TextInput value={del} onChange={setDelete} onSubmit={handleSubmit} />
				</Box>
			</Box>
			<Newline />
			<Text color="gray"> Press ESC to go back </Text>
		</Box>
	);
};

module.exports = DeleteTab;
