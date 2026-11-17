const React = require("react");
const { useState } = require("react");
const { Box, Text, useInput } = require("ink");
const SelectInput = require("ink-select-input-horizontal").default;
const importJsx = require("import-jsx");

const revertTab = require("./actions/revertStaged");
const stageFiles = require("./actions/stageFiles");
const pushTab = require("./actions/pushTab");
const pullTab = require("./actions/pullBranch");

const CheckoutBranch = importJsx("./components/CheckoutBranch");
const CommitAction = importJsx("./components/Commit");
const StageSomeFiles = importJsx('./components/StageChanges')
const Drop = importJsx('./components/DropDownOther')
const DeleteTab = importJsx("./components/DeleteBranch");
const { gitError } = require("./actions/git");
const immediateActions = {
	pushStagedChanges: pushTab,
	stageAll: stageFiles,
	revertStagedChanges: revertTab,
	pullFromBranch: pullTab
};

const Selector = ({ style, onStyleChange, repositoryStatus }) => {
	const { defaultColor, accentColor } = style;
	const [currentTab, setCurrentTab] = useState("");
	const [result, setResult] = useState(null);
	useInput((_, key) => {
		if (key.escape) {
			setResult(null);
			return setCurrentTab("");
		}
	}, { isActive: currentTab !== "other" });


	const handleSelect = (item) => {
		setCurrentTab(item.value);
		setResult(null);
		const action = immediateActions[item.value];
		if (action) {
			try {
				const message = action().trim();
				if (message) setResult({ message });
			} catch (error) {
				setResult({ message: gitError(error), failed: true });
			}
		}
	};

	const items = [
		{
			label: "Stage Changes",
			value: "stageSome",
		},
		{
			label: "Commit Changes",
			value: "commitChanges",
		},
		{
			label: "Push Staged Changes",
			value: "pushStagedChanges",
		},
		{
			label: "Pull From Branch",
			value: "pullFromBranch",
		},
		{
			label: "Checkout Branch",
			value: "checkoutBranch",
		},
		{
			label: "Delete Branch",
			value: "deleteBranch",
		},
		{
			label: 'Other',
			value: 'other'
		},
	];

	switch (currentTab) {
		case "checkoutBranch":
			return (
				<Box flexDirection="column">
					<SelectInput items={items} isFocused={false} defaultColor={defaultColor} accentColor={accentColor} />
					<CheckoutBranch refreshTab={setCurrentTab} defaultColor={defaultColor} accentColor={accentColor} />
				</Box>
			);
		case "commitChanges":
			return (
				<Box flexDirection="column">
					<SelectInput items={items} isFocused={false} defaultColor={defaultColor} accentColor={accentColor}/>
					<CommitAction refreshTab={setCurrentTab} />
				</Box>
			)
		case 'stageSome':
			return (
				<Box flexDirection="column">
					<SelectInput items={items} isFocused={false} defaultColor={defaultColor} accentColor={accentColor} />
					<StageSomeFiles repositoryStatus={repositoryStatus} defaultColor={defaultColor} accentColor={accentColor} />
				</Box>
			)

		case 'deleteBranch':
			return (
				<Box flexDirection="column">
					<SelectInput items={items} isFocused={false} defaultColor={defaultColor} accentColor={accentColor}/>
					<DeleteTab refreshTab={setCurrentTab} defaultColor={defaultColor} accentColor={accentColor} />
				</Box>
			)
		case 'other':
			return (
				<Box flexDirection='column'>
					<SelectInput items={items} isFocused={false} defaultColor={defaultColor} accentColor={accentColor}/>
					<Drop refreshTab={setCurrentTab} style={style} onStyleChange={onStyleChange} />
				</Box>
			)
		default:
			return (
				<Box key="main" flexDirection="column">
					<SelectInput items={items} defaultColor={defaultColor} accentColor={accentColor} onSelect={handleSelect} />
					{result ? <Text color={result.failed ? "red" : defaultColor}>{result.message}</Text> : null}
				</Box>
			);
	}
};

module.exports = Selector;
