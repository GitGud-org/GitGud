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

const Selector = () => {
	// const [branchCheckout, setCheckoutBranch] = useState(false);
	const [currentTab, setCurrentTab] = useState('zzzzz');


	const handleSelect = (item) => {
		// `item` = { label: 'First', value: 'first' }
		setCurrentTab(item.value)
		// console.log("current tab ", currentTab)
		if (item === items[0]) {
			pushTab();
		}
		if (item === items[1]) {
			stageFiles()
		}
		if (item === items[2]) {
			revertTab();
		}
		if (item === items[3]) {
			pullTab();
		}
		// if (item === items[3]) {
		// 	// setCheckoutBranch(!branchCheckout);
		// }
		// if (item === items[4]) {
		// 	// setCheckoutBranch(!branchCheckout);
		// }
	};

	const items = [
		{
			label: "Push Staged Changes",
			value: "pushStagedChanges",
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
			label: "Pull From Branch",
			value: "pullFromBranch",
		},
		{
			label: "Checkout Branch",
			value: "checkoutBranch",
		},
		{
			label: "Commit Changes",
			value: "commitChanges",
		},
	];

	switch (currentTab) {
		case 'checkoutBranch':
			return (
				<Box flexDirection="column">
					<SelectInput items={items} onSelect={handleSelect} />
					<CheckoutBranch refreshTab={setCurrentTab} item={items[3]} />
				</Box>)
		case 'commitChanges':
			return (
				<Box flexDirection="column">
					<SelectInput items={items} onSelect={handleSelect} />
					<CommitAction refreshTab={setCurrentTab}/>
				</Box>)
		default:
			return <SelectInput items={items} onSelect={handleSelect} />
	}

	// return !branchCheckout ? (
		// <SelectInput items={items} onSelect={handleSelect} />
	// ) : (
	// 	<Box flexDirection="column">
	// 		{/* */}

	// 		<CommitAction/>
	// 	</Box>
	// );
};

module.exports = Selector;
