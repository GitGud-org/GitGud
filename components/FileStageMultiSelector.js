const React = require('react');
const {render} = require('ink');
const MultiSelect = require('ink-multi-select').default;

const FileStageMultiSelector = () => {
	const handleSubmit = items => {
		// `items` = [{ label: 'First', value: 'first' }, { label: 'Third', value: 'third' }]
	};

	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}, {
		label: 'Third',
		value: 'third'
	}];

	return <MultiSelect items={items} onSubmit={handleSubmit}/>
};

module.exports = FileStageMultiSelector;
