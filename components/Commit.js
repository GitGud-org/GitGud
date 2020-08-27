const React = require("react");
const { useState } = require("react");
const { Box, Text, useInput } = require("ink");
const { execSync } = require("child_process");
const TextInput = require("ink-text-input").default;

const CommitAction = (props) => {
	const [message, setMessage] = useState("");

	let {refreshTab} = props

	const handleSubmit = () => {
		execSync('git commit -m "' + message +'"')
		refreshTab('')
	};
	return (
		<Box flexDirection="column">
			<Box marginRight={1}>
				<Text>Commit Message: </Text>
				<TextInput value={message} onChange={setMessage} onSubmit={handleSubmit} />
			</Box>
			<Text>Press ESC to go back </Text>
		</Box>
	);
}



module.exports = CommitAction;

