const React = require("react");
const importJsx = require("import-jsx");
const { useState } = require("react");
const { Box, Text } = require("ink");
const { execFileSync } = require("child_process");
const localBranches = require("../actions/localBranches");
const AutoComplete = importJsx("./AutoComplete");

const CheckoutBranch = ({ refreshTab, defaultColor, accentColor }) => {
	const [query, setQuery] = useState("");
	const [error, setError] = useState("");
	const [branches] = useState(localBranches);

	const updateQuery = value => {
		setQuery(value);
		setError("");
	};

	const checkoutBranch = (query) => {
		if (!query) return;
		try {
			const currentBranches = localBranches();
			const matches = currentBranches.includes(query) ? [query] :
				currentBranches.filter(branch => branch.toLowerCase() === query.toLowerCase());
			if (matches.length > 1) {
				setError("Several branches match. Enter the branch name with its exact capitalization.");
				return;
			}
			const args = matches.length
				? ["checkout", matches[0], "--"]
				: ["checkout", "-b", query];
			execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
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
				<Box marginRight={1}>
					<Text color={accentColor}> Checkout branch:</Text>
					<AutoComplete value={query} onChange={updateQuery} branches={branches} onSubmit={checkoutBranch} />
				</Box>
			</Box>
			<Box marginLeft={1}>
				<Text color="gray">Tab to complete · Esc to go back</Text>
			</Box>
			{error ? <Text color="red">{error}</Text> : null}
		</Box>
	);
};

module.exports = CheckoutBranch;
