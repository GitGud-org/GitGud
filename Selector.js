const React = require("react");
const { useEffect, useState, useRef } = require("react");
const { render, Box } = require("ink");
const SelectInput = require("ink-select-input-horizontal").default;
const pushTab = require("./actions/pushTab");
const revertTab = require("./actions/revertStaged");
const { propTypes } = require("ink-gradient");
const pullTab = require("./actions/pullBranch");


const importJsx = require("import-jsx");
const CheckoutBranch = importJsx("./actions/checkoutBranch");
const CommitAction = importJsx("./actions/commit");

const Selector = () => {
	const [branchCheckout, setCheckoutBranch] = useState(false);

	const handleSelect = (item) => {
		// `item` = { label: 'First', value: 'first' }
		if (item === items[0]) {
			pushTab();
		}
		if (item === items[1]) {
			revertTab();
		}
		if (item === items[2]) {
			pullTab();
		}
		if (item === items[3]) {
			console.log("inside handleSelect");
			setCheckoutBranch(!branchCheckout);
		}
		if (item === items[4]) {
			console.log("inside checkout");
			setCheckoutBranch(!branchCheckout);
		}
	};

	const items = [
		{
			label: "Push Staged Changes",
			value: "first",
		},
		{
			label: "Revert Staged Changes",
			value: "second",
		},
		{
			label: "Pull From Branch",
			value: "third",
		},
		{
			label: "Checkout branch",
			value: "fourth",
		},
		{
			label: "Commit Changes",
			value: "fifth",
		},
	];

	return !branchCheckout ? (
		<SelectInput items={items} onSelect={handleSelect} />
	) : (
		<Box flexDirection="column">
			{/* <SelectInput isFocused="false" items={items} /> */}
			{/* <CheckoutBranch handleSelect={handleSelect} item={items[3]} /> */}
			<CommitAction/>
		</Box>
	);
};

module.exports = Selector;
