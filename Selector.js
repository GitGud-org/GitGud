const React = require("react");
const { render } = require("ink");
const SelectInput = require("ink-select-input-horizontal").default;

const Selector = () => {
	const handleSelect = (item) => {
		// `item` = { label: 'First', value: 'first' }
	};

	const items = [
		{
			label: "First",
			value: "first",
		},
		{
			label: "Second",
			value: "second",
		},
		{
			label: "Third",
			value: "third",
		},
	];

	return <SelectInput items={items} onSelect={handleSelect} />;
};

module.exports = Selector;
