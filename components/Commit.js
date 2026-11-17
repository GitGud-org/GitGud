const React = require("react");
const { useState } = require("react");
const { Box, Text, Newline } = require("ink");
const { git, gitError } = require("../actions/git");
const TextInput = require("ink-text-input").default;

//Commit changes tab -- takes in a message to commit on the current branch

const CommitAction = ({ refreshTab }) => {
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const updateMessage = value => {
		setMessage(value);
		setError("");
	};

	const handleSubmit = () => {
		try {
			git(["commit", "-m", message]);
			refreshTab("");
		} catch (error) {
			setError(gitError(error));
		}
	};
	return (
		<Box flexDirection="column">
			<Box><Text> </Text></Box>
			<Box marginRight={1}>
				<Text color='red'>   Commit Message: </Text>
				<TextInput value={message} onChange={updateMessage} onSubmit={handleSubmit} />
			</Box>
			{error ? <Text color="red">{error}</Text> : null}
			<Newline />
			<Text color='gray'>   Press ESC to go back </Text>
		</Box>
	);
}



module.exports = CommitAction;

