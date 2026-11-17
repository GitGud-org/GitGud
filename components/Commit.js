const React = require("react");
const { useState } = require("react");
const { Box, Text, Newline } = require("ink");
const { execFileSync } = require("child_process");
const TextInput = require("ink-text-input").default;

//Commit changes tab -- takes in a message to commit on the current branch

const CommitAction = ({ refreshTab }) => {
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = () => {
		try {
			execFileSync("git", ["commit", "-m", message], {
				encoding: "utf8",
				stdio: ["ignore", "pipe", "pipe"]
			});
			refreshTab("");
		} catch (error) {
			setError([error.stderr, error.stdout].filter(Boolean).join("\n").trim() || error.message);
		}
	};
	return (
		<Box flexDirection="column">
			<Box><Text> </Text></Box>
			<Box marginRight={1}>
				<Text color='red'>   Commit Message: </Text>
				<TextInput value={message} onChange={setMessage} onSubmit={handleSubmit} />
			</Box>
			{error ? <Text color="red">{error}</Text> : null}
			<Newline />
			<Text color='gray'>   Press ESC to go back </Text>
		</Box>
	);
}



module.exports = CommitAction;

