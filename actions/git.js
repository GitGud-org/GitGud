const { execFileSync, spawn } = require("child_process");

function git(args, options) {
	return execFileSync("git", args, {
		encoding: "utf8",
		stdio: ["ignore", "pipe", "pipe"],
		...options
	});
}

function streamGit(args) {
	return spawn("git", args, { stdio: ["ignore", "pipe", "pipe"] });
}

function gitWithTerminal(args) {
	const stdin = process.stdin;
	if (!stdin.isTTY) return git(args);

	let env = process.env;
	if (process.platform !== "win32") {
		try {
			const tty = execFileSync("tty", [], {
				encoding: "utf8",
				stdio: ["inherit", "pipe", "ignore"]
			}).trim();
			env = { ...env, GPG_TTY: tty };
		} catch (error) {
			// Keep the shell's GPG_TTY when tty is unavailable.
		}
	}
	const wasRaw = stdin.isRaw;
	if (wasRaw) stdin.setRawMode(false);
	try {
		return git(args, { stdio: ["inherit", "pipe", "inherit"], env });
	} finally {
		if (wasRaw) stdin.setRawMode(true);
	}
}

function gitError(error) {
	return [error.stderr, error.stdout].filter(Boolean).join("\n").trim() || error.message;
}

module.exports = { git, streamGit, gitWithTerminal, gitError };
