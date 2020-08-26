const React = require("react");
const { useState } = require("react");
const { Box, Text } = require("ink");
const { execSync } = require("child_process");
const TextInput = require("ink-text-input").default;

const CommitAction = (props) => {
	const [message, setMessage] = useState("");

	const handleSubmit = () => {
		// props.handleSelect(props.item);
		execSync('git commit -m "' + message +'"')
	};
	return (
		<Box>
			<Box marginRight={1}>
				<Text>Commit Message: </Text>
			</Box>
			<TextInput value={message} onChange={setMessage} onSubmit={handleSubmit} />
		</Box>
	);
};

module.exports = CommitAction;
