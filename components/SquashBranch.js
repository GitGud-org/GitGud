const React = require("react");
const { Box, Text } = require("ink");
const SelectInput = require("ink-select-input-horizontal").default;
const TextInput = require("ink-text-input").default;
const localBranches = require("../actions/localBranches");
const { currentBranchRef, planSquash, squashBranch } = require("../actions/squashBranch");
const { gitError } = require("../actions/git");

const SquashBranch = ({ defaultColor, accentColor }) => {
	const [plan, setPlan] = React.useState(null);
	const [message, setMessage] = React.useState("");
	const [error, setError] = React.useState("");
	const [commit, setCommit] = React.useState("");
	const [branches] = React.useState(() => {
		try {
			const branch = currentBranchRef();
			return localBranches().filter(name => "refs/heads/" + name !== branch);
		} catch (error) {
			return [];
		}
	});
	const items = branches.map(branch => ({ label: branch, value: "base:" + branch }));
	items.push({ label: "Entire history (create a root commit)", value: "root" });

	const chooseBase = ({ value }) => {
		try {
			setPlan(planSquash(value === "root" ? "" : value.slice(5)));
			setError("");
		} catch (error) {
			setError(gitError(error));
		}
	};

	const submit = () => {
		try {
			setCommit(squashBranch(plan, message));
			setError("");
		} catch (error) {
			setError(gitError(error));
		}
	};

	return (
		<Box flexDirection="column" marginLeft={1}>
			{commit ? (
				<Text color={defaultColor}>Squashed {plan.count} commits into {commit.slice(0, 12)}.</Text>
			) : plan ? (
				<>
					<Text color={accentColor}>
						Squash {plan.count} commits on {plan.branch.slice("refs/heads/".length)} into one
						{plan.baseBranch ? ` after ${plan.base.slice(0, 12)} (shared with ${plan.baseBranch})` : " root commit"}.
					</Text>
					<Text color={defaultColor}>This rewrites local history. Enter a message and press Enter to confirm.</Text>
					<Box>
						<Text color={accentColor}>Commit message: </Text>
						<TextInput value={message} onChange={setMessage} onSubmit={submit} />
					</Box>
				</>
			) : (
				<>
					<Text color={accentColor}>Choose the base branch</Text>
					<SelectInput items={items} onSelect={chooseBase} displayDirection="column"
						defaultColor={defaultColor} accentColor={accentColor} />
				</>
			)}
			{error ? <Text color="red">{error}</Text> : null}
			<Text color="gray">Esc to go back</Text>
		</Box>
	);
};

module.exports = SquashBranch;
