const React = require("react");
const SelectInput = require("ink-select-input-horizontal").default;
const { propTypes } = require("ink-gradient");

const stageFiles = require('./actions/stageFiles')
const pushTab = require('./actions/pushTab')
const revertTab = require('./actions/revertStaged');
const pullTab = require('./actions/pullBranch')

const Selector = () => {
	const handleSelect = (item) => {
		// `item` = { label: 'First', value: 'first' }
		if(item === items[0]) {stageFiles()}
		if(item === items[1]){revertTab()}
		if(item === items[2]){pushTab()}
		if(item === items[3]){pullTab()}
	};

	const items = [
		{
			label: "Stage Files",
			value: "zeroth"
		},
		{
			label: "Revert Staged Changes",
			value: "first",
		},
		{
			label: "Push Staged Changes",
			value: "second",
		},
		{
			label: "Pull From Branch",
      value: "third",
		},
	];

	return <SelectInput items={items} onSelect={handleSelect} />;
};

module.exports = Selector;
