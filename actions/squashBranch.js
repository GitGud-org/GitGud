const { execFileSync } = require("child_process");
const { existsSync } = require("fs");

function git(...args) {
	return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

function currentBranchRef() {
	try {
		return git("symbolic-ref", "--quiet", "HEAD");
	} catch (error) {
		throw new Error("Check out a local branch before squashing.");
	}
}

function planSquash(baseBranch) {
	const branch = currentBranchRef();
	if (git("rev-parse", "--is-shallow-repository") === "true") {
		throw new Error("Fetch the full history before squashing a shallow repository.");
	}
	const operationPaths = ["MERGE_HEAD", "CHERRY_PICK_HEAD", "REVERT_HEAD", "BISECT_START",
		"rebase-merge", "rebase-apply", "sequencer"];
	if (operationPaths.some(name => existsSync(git("rev-parse", "--git-path", name)))) {
		throw new Error("Finish the current Git operation before squashing.");
	}
	if (git("status", "--porcelain", "--untracked-files=normal", "--ignore-submodules=none")) {
		throw new Error("Commit or stash your changes before squashing.");
	}
	let head;
	try {
		head = git("rev-parse", "--verify", branch + "^{commit}");
	} catch (error) {
		throw new Error("Make your first commit before squashing.");
	}

	let base = "";
	if (baseBranch) {
		const baseRef = "refs/heads/" + baseBranch;
		if (baseRef === branch) throw new Error("Choose a different base branch.");
		try {
			base = git("merge-base", "--all", head, baseRef);
		} catch (error) {
			throw new Error((error.stderr || "").trim() || "The selected branch shares no history with this branch.");
		}
		if (base.includes("\n")) throw new Error("The selected branch has multiple merge bases. Choose a different base.");
	}
	const count = Number(git("rev-list", "--count", base ? base + ".." + head : head));
	if (count < 2) throw new Error("At least two commits are required to squash.");
	return { branch, head, base, baseBranch, count };
}

function squashBranch(plan, message) {
	if (!message.trim()) throw new Error("Enter a commit message.");
	const current = planSquash(plan.baseBranch);
	if (current.branch !== plan.branch || current.head !== plan.head || current.base !== plan.base) {
		throw new Error("The branch or base changed. Reopen Squash Branch and review the new plan.");
	}
	const args = ["commit-tree", plan.head + "^{tree}", "-m", message];
	if (plan.base) args.push("-p", plan.base);
	if (git("config", "--type=bool", "--default=false", "--get", "commit.gpgSign") === "true") args.push("-S");
	const commit = git(...args);
	git("update-ref", "--create-reflog", "-m", "gitgud: squash branch", plan.branch, commit, plan.head);
	return commit;
}

module.exports = { currentBranchRef, planSquash, squashBranch };
