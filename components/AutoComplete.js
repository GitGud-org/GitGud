const React = require("react");
const TextInput = require("ink-text-input").default;
const { Box, Text, useInput } = require("ink");

const AutoComplete = ({valueControl={val, setValue}, baseList, handleSubmit}) => {
    const [suggestion, setSuggestion] = React.useState('');
    const updateSuggestion = (input) => {
		valueControl.setValue(input);
		if (input.length > 0) {
		  const match = baseList.find(w => w.trim().startsWith(input.toLowerCase()));
		  setSuggestion(match || "");
		} else {
		  setSuggestion("");
		}
	};

    useInput((input, key) => {
		if (key.tab && suggestion) {
		  valueControl.setValue(suggestion);
		  setSuggestion("");
		}
	});

    return (
        <Box>
			<Box>
				<TextInput value={valueControl.val} onChange={updateSuggestion} onSubmit={handleSubmit} showCursor={true}/>
			</Box>
			<Text color="gray">
				{suggestion.slice(valueControl.val.length)}
			</Text>
		</Box>
            
    )
};

module.exports = AutoComplete;