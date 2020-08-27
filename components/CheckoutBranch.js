const React = require("react");
const { useState } = require("react");
const { render, Box, Text, Newline } = require("ink");
const { execSync } = require("child_process");
const TextInput = require("ink-text-input").default;

const CheckoutBranch = (props) => {
	const [query, setQuery] = useState("");

	let {refreshTab} = props

	const checkoutBranch = () => {
		let branches = execSync(
			"git for-each-ref --format='%(refname:short)' refs/heads/"
		)
			.toString()
			.split("\n");
		if (branches.includes(query)) {
			execSync(`git checkout -f ${query}`);
		} else {
			execSync(`git checkout -b ${query}`);
		}
		refreshTab('')
	};
	return (
		<Box>
			<Box marginRight={1}>
				<Text>Checkout branch name:</Text>
			</Box>
			<TextInput value={query} onChange={setQuery} onSubmit={checkoutBranch} />
		</Box>
	);
};

module.exports = CheckoutBranch;
