const React = require("react");
const importJsx = require("import-jsx");
const { useState } = require("react");
const { Box, Text, Newline } = require("ink");
const { execFileSync } = require("child_process");
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
			execFileSync("git", ["branch", "-D", "--", branch], {
				encoding: "utf8",
				stdio: ["ignore", "pipe", "pipe"]
			});
			refreshTab("");
		} catch (error) {
			setError((error.stderr || error.message).trim());
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
