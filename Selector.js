const React = require("react");
const { useEffect, useState, useRef } = require("react");
const { Box, useInput } = require("ink");
const SelectInput = require("ink-select-input-horizontal").default;
const { propTypes } = require("ink-gradient");
const importJsx = require("import-jsx");

const pushTab = require("./actions/pushTab");
const revertTab = require("./actions/revertStaged");
const pullTab = require("./actions/pullBranch");
const stageFiles = require('./actions/stageFiles')
const DeleteTab = importJsx('./actions/deleteBranch')

const CheckoutBranch = importJsx("./actions/checkoutBranch");
const CommitAction = importJsx("./actions/commit");

const Selector = () => {
	const [currentTab, setCurrentTab] = useState('');

	useInput((input, key) => {
		if (key.escape) {
			return setCurrentTab('')
		}
	})

	const handleSelect = (item) => {
		setCurrentTab(item.value)
		if (item.value === "pushStagedChanges") {
			pushTab();
		}
		if (item.value === "stageAll") {
			stageFiles()
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
			label: "Stage All",
			value: "stageAll",
		},
		{
			label: "Revert Staged Changes",
			value: "revertStagedChanges",
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
		}
	];

	switch (currentTab) {
		case 'checkoutBranch':
			return (
				<Box flexDirection="column">
					<SelectInput items={items} onSelect={handleSelect} />
					<CheckoutBranch refreshTab={setCurrentTab}/>
				</Box>)
		case 'commitChanges':
			return (
				<Box flexDirection="column">
					<SelectInput items={items} onSelect={handleSelect} />
					<CommitAction refreshTab={setCurrentTab}/>
				</Box>)
    case 'deleteBranch':
			return (
				<Box flexDirection='column'>
					<SelectInput items={items} onSelect={handleSelect} />
					<DeleteTab refreshTab={setCurrentTab}/>
				</Box>)
		default:
			return <SelectInput items={items} onSelect={handleSelect} />
	}
};

module.exports = Selector;
