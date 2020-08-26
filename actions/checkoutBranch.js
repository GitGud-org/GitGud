const React = require("react");
const { useState } = require("react");
const { render, Box, Text, Newline } = require("ink");
const { execSync } = require("child_process");
const TextInput = require("ink-text-input").default;

const CheckoutBranch = () => {
	const [query, setQuery] = useState("");

	return (
		<Box>
			<Box marginRight={1}>
				<Text>Enter your query:</Text>
			</Box>

			<TextInput value={query} onChange={setQuery} />
			<Box>
				<Text>Your query is: {query}</Text>
			</Box>
		</Box>
	);
};

module.exports = CheckoutBranch;
