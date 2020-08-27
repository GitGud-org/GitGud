const React = require("react");
const { useEffect, useState, useRef } = require("react");
const { render, Box } = require("ink");
const SelectInput = require("ink-select-input-horizontal").default;
const { propTypes } = require("ink-gradient");
const importJsx = require("import-jsx");

const pushTab = require("./actions/pushTab");
const revertTab = require("./actions/revertStaged");
const pullTab = require("./actions/pullBranch");
const stageFiles = require('./actions/stageFiles')

const CheckoutBranch = importJsx("./actions/checkoutBranch");
const CommitAction = importJsx("./actions/commit");
const StageSomeFiles = importJsx('./components/StageSomeFiles')

const Selector = () => {
	// const [branchCheckout, setCheckoutBranch] = useState(false);
	const [currentTab, setCurrentTab] = useState('');


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
		// if (item.value === "stageSome") {

		// }
	};

	const items = [
		{
			label: "Stage Some",
			value: "stageSome",
		},
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
	];

	switch (currentTab) {
		case 'checkoutBranch':
			return (
				<Box flexDirection="column">
					<SelectInput items={items} onSelect={handleSelect} />
					<CheckoutBranch refreshTab={setCurrentTab} item={items[3]} />
				</Box>
				)
		case 'commitChanges':
			return (
				<Box flexDirection="column">
					<SelectInput items={items} onSelect={handleSelect} />
					<CommitAction refreshTab={setCurrentTab}/>
				</Box>
				)
		case 'stageSome':
			return (
				<Box flexDirection="column">
					<SelectInput items={items} onSelect={handleSelect} />
					<StageSomeFiles refreshTab={setCurrentTab}/>
				</Box>
			)
		default:
			return <SelectInput items={items} onSelect={handleSelect} setCurrentTab={setCurrentTab} />
	}
};

module.exports = Selector;
