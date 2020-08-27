const React = require("react");
const { useEffect, useState, useRef } = require("react");
const { render, Box } = require("ink");
const SelectInput = require("ink-select-input-horizontal").default;
const pushTab = require('./actions/pushTab')
const revertTab = require('./actions/revertStaged');
const { propTypes } = require("ink-gradient");
const pullTab = require('./actions/pullBranch')
const importJsx = require('import-jsx')
const DeleteTab = importJsx('./actions/deleteBranch')

const Selector = () => {
	const [currentTab, setCurrentTab] = useState('')
	const handleSelect = (item) => {
		setCurrentTab(item.value)
		if (item === items[0]) { pushTab() }
		if (item === items[1]) { revertTab() }
		if (item === items[2]) { pullTab() }
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

	switch(currentTab) {
		case 'fourth':
			return (
				<Box flexDirection='column'>
					<SelectInput items={items} onSelect={handleSelect} />
					<DeleteTab refreshTab={setCurrentTab} item = {items[3]}/>
				</Box>
			)
	}
	return <SelectInput items={items} onSelect={handleSelect} />;
};

module.exports = Selector;
