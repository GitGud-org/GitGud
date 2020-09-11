const React = require("react");
const { useState } = require("react");
const { Box, Text, useInput, Newline } = require("ink");
const { execSync } = require("child_process");
const TextInput = require("ink-text-input").default;

//Commit changes tab -- takes in a message to commit on the current branch

const CommitAction = (props) => {
	const [message, setMessage] = useState("");

	let {refreshTab} = props

	const handleSubmit = () => {
		try {
			execSync('git commit -m "' + message +'"')
			refreshTab('')
		} catch (error) {}
	};
	return (
		<Box flexDirection="column">
			<Box><Text> </Text></Box>
			<Box marginRight={1}>
				<Text color='red'>   Commit Message: </Text>
				<TextInput value={message} onChange={setMessage} onSubmit={handleSubmit} />
			</Box>
			<Newline />
			<Text color='gray'>   Press ESC to go back </Text>
		</Box>
	);
}



module.exports = CommitAction;

