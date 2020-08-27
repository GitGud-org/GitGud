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
	return (
		<Box>
			<Box marginRight={1}>
				<Text>Checkout branch name:</Text>
			</Box>
			<TextInput value={query} onChange={setQuery} onSubmit={logSomething} />
		</Box>
	);
};

module.exports = CheckoutBranch;
