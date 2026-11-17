const React = require("react");
const TextInput = require("ink-text-input").default;
const { Box, Text, useInput } = require("ink");

const AutoComplete = ({ value, onChange, branches, onSubmit }) => {
	const exact = branches.includes(value);
	const suggestion = value
		? branches.find(branch => branch !== value && branch.startsWith(value)) ||
			branches.find(branch => (!exact || branch.length > value.length) &&
				branch.toLowerCase().startsWith(value.toLowerCase()))
		: undefined;
	const [inputVersion, setInputVersion] = React.useState(0);

	useInput((_, key) => {
		if (key.tab && !key.shift && suggestion) {
			onChange(suggestion);
			// Ink's text input retains its cursor offset after external updates.
			setInputVersion(version => version + 1);
		}
	});

	return (
		<Box>
			<TextInput key={inputVersion} value={value} onChange={onChange} onSubmit={onSubmit} />
			{suggestion && <Text color="gray">{suggestion.slice(value.length)}</Text>}
		</Box>
	);
};

module.exports = AutoComplete;
