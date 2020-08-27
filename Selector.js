const React = require("react");
const { render } = require("ink");
const SelectInput = require("ink-select-input-horizontal").default;
const pushTab = require('./actions/pushTab')
const revertTab = require('./actions/revertStaged');
const { propTypes } = require("ink-gradient");
const pullTab = require('./actions/pullBranch')
const deleteTab = require('./actions/deleteBranch')

const Selector = () => {
	const handleSelect = (item) => {
		// `item` = { label: 'First', value: 'first' }
		if (item === items[0]) { pushTab() }
		if (item === items[1]) { revertTab() }
		if (item === items[2]) { pullTab() }
		if (item === items[3]) { deleteTab() }
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
			label: "Delete Branch",
			value: "fourth",
		}
	];

	return <SelectInput items={items} onSelect={handleSelect} />;
};

module.exports = Selector;
