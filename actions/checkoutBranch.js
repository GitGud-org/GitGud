const React = require("react");
const { useState } = require("react");
const { render, Box, Text, Newline } = require("ink");
const { execSync } = require("child_process");
const TextInput = require("ink-text-input").default;

const CheckoutBranch = (props) => {
	const [query, setQuery] = useState("");
	// const handleSelect = props.handleSelect;
	const logSomething = () => {
		props.handleSelect(props.item);
	};
	const checkoutBranch = () => {
		let branches = execSync(
			"git for-each-ref --format='%(refname:short)' refs/heads/"
		)
			.toString()
			.split("\n");
		console.log(branches);
		// let checkedOut = execSync(`git checkout -b ${query}`).catch(
		// 	console.log("caught!")
		// );
		// console.log(checkedOut);
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
