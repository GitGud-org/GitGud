const React = require("react");
const { useState, useEffect } = require("react");
const { Box, useInput, useFocus, useFocusManager  } = require("ink");
const SelectInput = require("ink-select-input-horizontal").default;
const importJsx = require("import-jsx");

const TreeTab = importJsx('./actions/treeTab')
const pushTab = require("./actions/pushTab");
const revertTab = require("./actions/revertStaged");
const pullTab = require("./actions/pullBranch");
const stageFiles = require("./actions/stageFiles");
const DeleteTab = importJsx("./actions/deleteBranch");
const Drop = importJsx('./actions/dropDownOther')

const CheckoutBranch = importJsx("./components/CheckoutBranch");
const CommitAction = importJsx("./components/Commit");
const StageSomeFiles = importJsx('./components/StageChanges')

const Selector = ({defaultColor, accentColor}) => {
	const [currentTab, setCurrentTab] = useState("");
	let {isFocused} = useFocus();
	const {disableFocus, enableFocus}  = useFocusManager();

	useInput((input, key) => {
		if (key.escape) {
			return setCurrentTab("");
		}
	});


	const handleSelect = (item) => {
		setCurrentTab(item.value);
		if (item.value === "pushStagedChanges") {
			pushTab();
		}
		if (item.value === "stageAll") {
			stageFiles();
		}
		if (item.value === "revertStagedChanges") {
			revertTab();
		}
		if (item.value === "pullFromBranch") {
			pullTab();
		}
		if (item.value === 'stageSome') {
			isFocused = true;
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
					<CheckoutBranch refreshTab={setCurrentTab} />
				</Box>
			);
		case "commitChanges":
			return (
				<Box flexDirection="column">
					<SelectInput items={items} isFocused={false} />
					<CommitAction refreshTab={setCurrentTab} />
				</Box>
			)
		case 'stageSome':
			return (
				<Box flexDirection="column">
					<SelectInput items={items} isFocused={false} defaultColor={defaultColor} accentColor={accentColor} />
					<StageSomeFiles refreshTab={setCurrentTab} defaultColor={defaultColor} accentColor={accentColor} />
				</Box>
			)

		case 'deleteBranch':
			return (
				<Box flexDirection="column">
					<SelectInput items={items} isFocused={false} />
					<DeleteTab refreshTab={setCurrentTab} />
				</Box>
			)
		case 'other':
			return (
				<Box flexDirection='column'>
					<SelectInput items={items} isFocused={false} />
					<Drop refreshTab={setCurrentTab} />
				</Box>
			)
		default:
			return <SelectInput items={items} onSelect={handleSelect} />;
	}
};

module.exports = Selector;
