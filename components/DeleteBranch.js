const React = require("react");
const importJsx = require("import-jsx");
const { useState } = require("react");
const { Box, Text, Newline } = require("ink");
const { git, gitError } = require("../actions/git");
const localBranches = require("../actions/localBranches");
const AutoComplete = importJsx("./AutoComplete");

const DeleteTab = ({ refreshTab, defaultColor, accentColor }) => {
	const [branch, setBranch] = useState("");
	const [error, setError] = useState("");
	const [branches] = useState(localBranches);

	const updateBranch = value => {
		setBranch(value);
		setError("");
	};

	const handleSubmit = (branch) => {
		try {
			git(["branch", "-d", "--", branch]);
			refreshTab("");
		} catch (error) {
			setError(gitError(error));
		}
	};
	return (
		<Box flexDirection="column">
			<Box>
				<Text> </Text>
			</Box>
			<Box>
				<Text color={accentColor}> Branches: </Text>
				<Text color={defaultColor}>{branches.join(" | ")}</Text>
			</Box>
			<Box>
				<Box>
					<Text color={accentColor}> Delete Branch: </Text>
					<AutoComplete value={branch} onChange={updateBranch} branches={branches} onSubmit={handleSubmit} />
				</Box>
			</Box>
			<Newline />
			<Text color="gray">Tab to complete · Esc to go back</Text>
			{error ? <Text color="red">{error}</Text> : null}
		</Box>
	);
};

module.exports = DeleteTab;
