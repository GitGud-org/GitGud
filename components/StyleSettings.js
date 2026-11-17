const React = require("react");
const { Box, Text } = require("ink");
const SelectInput = require("ink-select-input-horizontal").default;
const { fields, saveStyle } = require("../stylePreferences");

const showValue = value => typeof value === "boolean" ? (value ? "On" : "Off") : value;

const StyleSettings = ({ style, onStyleChange }) => {
	const [field, setField] = React.useState(null);
	const [status, setStatus] = React.useState("");
	const { defaultColor, accentColor } = style;
	const items = field
		? field.options.map((value, index) => ({ label: showValue(value), value: index }))
		: fields.map(setting => ({ label: `${setting.label} (${showValue(style[setting.key])})`, value: setting.key }));

	const handleSelect = ({ value }) => {
		if (!field) {
			setField(fields.find(setting => setting.key === value));
			setStatus("");
			return;
		}
		try {
			onStyleChange(saveStyle(field.key, field.options[value]));
			setStatus(`${field.label} saved.`);
			setField(null);
		} catch (error) {
			setStatus(`Could not save style settings: ${error.message}`);
		}
	};

	return (
		<Box flexDirection="column" marginLeft={1}>
			<Text color={accentColor}>{field ? field.label : "Style Settings"}</Text>
			<SelectInput key={field ? field.key : "fields"} items={items} onSelect={handleSelect}
				displayDirection="column" defaultColor={defaultColor} accentColor={accentColor} />
			{status ? <Text color={defaultColor}>{status}</Text> : null}
			<Text color="gray">Esc to go back</Text>
		</Box>
	);
};

module.exports = StyleSettings;
