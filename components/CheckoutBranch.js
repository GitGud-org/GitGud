const React = require("react");
const { useState } = require("react");
const { render, Box, Text, Newline } = require("ink");
const { execSync } = require("child_process");
const TextInput = require("ink-text-input").default;

const CheckoutBranch = (props) => {
	const [query, setQuery] = useState("");

	let { refreshTab } = props;

	let branches = execSync(
		"git for-each-ref --format='%(refname:short)' refs/heads/"
	)
		.toString()
		.split("\n");

	const checkoutBranch = () => {
		if (branches.includes(query)) {
			try {
				execSync(`git checkout ${query}`);
				refreshTab("");
			} catch (error) {}
		} else {
			execSync(`git checkout -b ${query}`);
			refreshTab("");
		}
	};
	return (
		<Box flexDirection="column">
			<Box>
				<Text> </Text>
			</Box>
			<Box>
				<Text color="red"> Branches: </Text>
				<Text>{branches.join("  ")}</Text>
			</Box>
			<Box>
				<Box marginRight={1}>
					<Text color="red"> Checkout branch:</Text>
				</Box>
				<TextInput
					value={query}
					onChange={setQuery}
					onSubmit={checkoutBranch}
				/>
			</Box>
			<Box marginLeft={1}>
				<Text color="gray">Press ESC to go back</Text>
			</Box>
		</Box>
	);
};

module.exports = CheckoutBranch;
