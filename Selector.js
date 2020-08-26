const React = require("react");
const SelectInput = require("ink-select-input-horizontal").default;
const { Text, Box, Newline, Spacer } = require("ink");
const { propTypes } = require("ink-gradient");
const importJsx = require("import-jsx")

const FileStageMultiSelector = importJsx('./components/FileStageMultiSelector')

const stageTab = require('./actions/stageFiles')
const pushTab = require('./actions/pushTab')
const revertTab = require('./actions/revertStaged');
const pullTab = require('./actions/pullBranch')

const Selector = () => {
	const handleSelect = (item) => {
		// `item` = { label: 'First', value: 'first' }
		if(item === items[0]) {stageTab()}
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

	return (
		<Box>
			<SelectInput items={items} onSelect={handleSelect} />
			<FileStageMultiSelector />
		</Box>
	);
};

module.exports = Selector;
