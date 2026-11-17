const React = require("react");
const { Box, Text } = require("ink");
const TextInput = require("ink-text-input").default;
const { git, gitError } = require("../actions/git");

const CommitRevert = () => {
	const [commitId, setCommitId] = React.useState("");
	const [result, setResult] = React.useState(null);
	const [latestCommit] = React.useState(() => {
		try {
			return git(["log", "-1", "--format=%h", "HEAD"]).trim();
		} catch (error) {
			return "";
		}
	});

	const revert = () => {
		if (!commitId.trim()) return;
		try {
			git(["revert", "--no-edit", "-m", "1", "--", commitId]);
			setResult({ message: "Commit reverted." });
			setCommitId("");
		} catch (error) {
			setResult({ message: gitError(error), failed: true });
		}
	};

	return (
		<Box flexDirection="column">
			<Text>This creates a new commit that reverses the selected changes.</Text>
			{latestCommit ? <Text>Latest Commit Id: {latestCommit}</Text> : null}
			<Box>
				<Text>Commit ID: </Text>
				<TextInput value={commitId} onChange={value => {
					setCommitId(value);
					setResult(null);
				}} onSubmit={revert} />
			</Box>
			{result ? <Text color={result.failed ? "red" : undefined}>{result.message}</Text> : null}
			<Text color="gray">Press ESC to go back</Text>
		</Box>
	);
};

module.exports = CommitRevert;
