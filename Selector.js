const React = require("react");
const { useState } = require("react");
const { Box, useInput } = require("ink");
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
// const Stash = importJsx('./components/Other')

const Selector = () => {
	const [currentTab, setCurrentTab] = useState("");

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
		// {
		// 	label: "Access Full Log Tree",
		// 	value: "logTree"
		// },
		{
			label: 'Other',
			value: 'other'
		},
	];

	switch (currentTab) {
		case 'logTree':
			// return (
			// 	<Box>
			// 		<TreeTab />
			// 	</Box>
			// )
		case "checkoutBranch":
			return (
				<Box flexDirection="column">
					{/* <SelectInput items={items} onSelect={handleSelect} /> */}
					<CheckoutBranch refreshTab={setCurrentTab} />
				</Box>
			);
		case "commitChanges":
			return (
				<Box flexDirection="column">
					<SelectInput items={items} onSelect={handleSelect} />
					<CommitAction refreshTab={setCurrentTab} />
				</Box>
			)
		case 'stageSome':
			return (
				<Box flexDirection="column">
					<SelectInput items={items} onSelect={handleSelect} />
					<StageSomeFiles refreshTab={setCurrentTab} />
				</Box>
			)

		case 'deleteBranch':
			return (
				<Box flexDirection="column">
					<SelectInput items={items} onSelect={handleSelect} />
					<DeleteTab refreshTab={setCurrentTab} />
				</Box>
			)
		case 'other':
			return (
				<Box flexDirection='column'>
					<SelectInput items={items} onSelect={handleSelect} />
					<Drop refreshTab={setCurrentTab} />
				</Box>
			)
		default:
			return <SelectInput items={items} onSelect={handleSelect} />;
	}
};

module.exports = Selector;
