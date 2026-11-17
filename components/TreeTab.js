const React = require("react");
const { Box, Text, useInput } = require("ink");
const { git, gitError } = require("../actions/git");

const pageSize = 15;

function readPage(index) {
	return git([
		"log", "--all", "--graph", "--decorate", "--format=%h%d %<(240,trunc)%s",
		"--max-count=" + pageSize, "--skip=" + (index * pageSize)
	]).replace(/[ \t]+$/gm, "").trimEnd();
}

const TreeTab = ({ gitTreeColor }) => {
	const [page, setPage] = React.useState(() => {
		try {
			const text = readPage(0);
			return { index: 0, text, end: !text };
		} catch (error) {
			return { index: 0, text: "", status: gitError(error), end: true };
		}
	});

	useInput((_, key) => {
		if (key.pageDown || key.downArrow || key.pageUp || key.upArrow) {
			const forward = key.pageDown || key.downArrow;
			const index = page.index + (forward ? 1 : -1);
			if (index < 0 || (forward && page.end)) return;
			try {
				const text = readPage(index);
				if (text) setPage({ index, text });
				else setPage({ ...page, end: true, status: "End of history." });
			} catch (error) {
				setPage({ ...page, status: gitError(error) });
			}
		}
	});

	return (
		<Box flexDirection="column">
			<Text color={gitTreeColor}>{page.text || "No commits to display."}</Text>
			{page.status ? <Text>{page.status}</Text> : null}
			<Text color="gray">Page {page.index + 1} · Up/Down to browse · Press ESC to go back</Text>
		</Box>
	);
};

module.exports = TreeTab;
