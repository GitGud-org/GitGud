const React = require("react");
const { useEffect, useState, useRef } = require("react");
const { render } = require("ink");
const SelectInput = require("ink-select-input-horizontal").default;
const pushTab = require("./actions/pushTab");
const revertTab = require("./actions/revertStaged");
const { propTypes } = require("ink-gradient");
const pullTab = require("./actions/pullBranch");

const importJsx = require("import-jsx");
const CheckoutBranch = importJsx("./actions/checkoutBranch");

const Selector = () => {
	const [branchCheckout, setCheckoutBranch] = useState(true);

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
	];

	return !branchCheckout ? (
		<SelectInput items={items} onSelect={handleSelect} />
	) : (
		<CheckoutBranch />
	);
};

module.exports = Selector;
