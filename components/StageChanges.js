const React = require("react");
const { Box, Text } = require("ink");
const SelectInput = require("ink-select-input-horizontal").default;
const { git, gitError } = require("../actions/git");

const allFiles = { label: "STAGE/UNSTAGE (all files)", value: "all" };

function readFiles(pathspec = []) {
	const records = git(["status", "--short", "-z", ...pathspec]).split("\0").filter(Boolean);
	const files = [];
	for (let index = 0; index < records.length; index++) {
		const record = records[index];
		const flags = record.slice(0, 2);
		const paths = [record.slice(3)];
		if (/[RC]/.test(flags)) paths.push(records[++index]);
		for (const path of paths) {
			files.push({ label: path, value: files.length, flags });
		}
	}
	return files;
}

const StageChanges = ({ repositoryStatus, accentColor, defaultColor }) => {
	const [files, setFiles] = React.useState([]);
	const [error, setError] = React.useState("");

	const refresh = () => {
		try {
			setFiles(readFiles());
		} catch (error) {
			setError(gitError(error));
		}
	};

	React.useEffect(refresh, [repositoryStatus]);

	const handleSelect = item => {
		try {
			const all = item.value === "all";
			const unstage = all
				? !readFiles(["--", "."]).some(file => file.flags[1] !== " ")
				: item.flags[0] !== " " && item.flags[0] !== "?";
			const command = unstage ? ["restore", "--staged"] : ["add"];
			const scope = all ? [] : ["-C", git(["rev-parse", "--show-toplevel"]).replace(/\r?\n$/, "")];
			git([...scope, "--literal-pathspecs", ...command, "--", all ? "." : item.label]);
			setError("");
			refresh();
		} catch (error) {
			setError(gitError(error));
		}
	};

	return (
		<Box flexDirection="column" marginLeft={3}>
			<SelectInput items={[allFiles, ...files]} onSelect={handleSelect}
				displayDirection="column" defaultColor={defaultColor} accentColor={accentColor} />
			{error ? <Text color="red">{error}</Text> : null}
			<Text color="gray">Press ESC to go back</Text>
		</Box>
	);
};

module.exports = StageChanges;
