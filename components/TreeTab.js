const React = require("react");
const { Box, Text, useInput, useStdout } = require("ink");
const { streamGit } = require("../actions/git");

const TreeTab = ({ gitTreeColor }) => {
	const { stdout } = useStdout();
	const [pageSize] = React.useState(() => Math.max(1, Math.min(15, (stdout.rows || 24) - 10)));
	const [page, setPage] = React.useState({ index: 0, lines: [], status: "Loading history…" });
	const move = React.useRef(null);

	React.useEffect(() => {
		const child = streamGit(["log", "--all", "--graph", "--decorate", "--format=%h%d %<(240,trunc)%s"]);
		const lines = [];
		let partial = "";
		let stderr = "";
		let index = 0;
		let requestedPage = null;
		let ended = false;
		let disposed = false;

		const show = (next, status = "") => {
			index = next;
			setPage({ index, lines: lines.slice(index * pageSize, (index + 1) * pageSize), status });
		};

		const showAvailable = (status = "") => {
			if (requestedPage !== null) {
				if (requestedPage * pageSize < lines.length) {
					index = requestedPage;
					requestedPage = null;
				} else if (ended) {
					requestedPage = null;
					if (!status && lines.length) status = "End of history.";
				}
			}
			show(index, status);
		};

		const readToCurrentPage = () => {
			if (!ended && lines.length <= (index + 1) * pageSize) {
				child.stdout.resume();
			} else {
				child.stdout.pause();
			}
		};

		child.stdout.setEncoding("utf8");
		child.stdout.on("data", chunk => {
			if (disposed) return;
			const complete = (partial + chunk).split("\n");
			partial = complete.pop();
			for (const line of complete) lines.push(line.trimEnd());
			showAvailable();
			readToCurrentPage();
		});
		child.stderr.setEncoding("utf8");
		child.stderr.on("data", chunk => { stderr += chunk; });
		child.on("error", error => {
			ended = true;
			if (!disposed) showAvailable(error.message);
		});
		child.on("close", code => {
			if (disposed || ended) return;
			ended = true;
			if (partial) lines.push(partial.trimEnd());
			showAvailable(code === 0 ? "" : (stderr.trim() || "Git could not load history."));
		});

		move.current = direction => {
			const next = index + direction;
			if (next < 0) return;
			requestedPage = null;
			if (next * pageSize >= lines.length) {
				if (ended && lines.length) show(index, "End of history.");
				else if (!ended) {
					requestedPage = next;
					show(index, "Loading history…");
					child.stdout.resume();
				}
				return;
			}
			show(next);
			readToCurrentPage();
		};
		return () => {
			disposed = true;
			move.current = null;
			if (!ended) child.kill();
		};
	}, [pageSize]);

	useInput((_, key) => {
		if (!move.current) return;
		if (key.pageDown || key.downArrow) move.current(1);
		if (key.pageUp || key.upArrow) move.current(-1);
	});

	return (
		<Box flexDirection="column">
			{page.lines.map((line, offset) => (
				<Text key={offset} color={gitTreeColor} wrap="truncate-end">{line}</Text>
			))}
			{page.status || !page.lines.length
				? <Text>{page.status || "No commits to display."}</Text>
				: null}
			<Text color="gray">Page {page.index + 1} · Up/Down to browse · Press ESC to go back</Text>
		</Box>
	);
};

module.exports = TreeTab;
