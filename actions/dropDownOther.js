const React = require("react");
const { useEffect, useState, useRef } = require("react");
const { Text, Box, Newline } = require("ink");
const SelectInput = require("ink-select-input").default;
const { execSync, exec } = require("child_process");
const importJsx = require("import-jsx");
const TreeTab = importJsx('./TreeTab')
const Stash = importJsx('./stash')

const dropDown = ({ refreshTab }) => {
    // const [gitOther, setOther] = useState('')
    const [currentDrop, setCurrentDrop] = useState('')

    const handleSelect = (item) => {
        setCurrentDrop(item.value)
        if (item.label === 'fullLogTree') {
            TreeTab()
        }
        if(item.label === 'stashChanges') {
            Stash()
        }
    }
    const items = [
        {
            label: 'Access Full Log Tree',
            value: 'fullLogTree'
        },
        {
            label: 'Stash Changes',
            value: 'stashChanges'
        }
    ]
    switch(currentDrop) {
        case 'fullLogTree':
            return (
                <Box flexDirection='column'>
					<SelectInput items={items} isFocused={false} />
					<TreeTab refreshTab={setCurrentDrop} />
				</Box>
            )
        case 'stashChanges':
            return (
                <Box flexDirection='column'>
                    <SelectInput items={items} isFocused={false} />
                    <Stash refreshTab={setCurrentDrop} />
                </Box>
            )
        default:
            return <SelectInput items={items} onSelect={handleSelect} />
    }
    return (
        <Box flexDirection="column" marginLeft='109' >
            <SelectInput items={items} onSelect={handleSelect} />
            <Newline />
            <Text color='gray'>Press ESC to go back</Text>
        </Box>
    )
};

module.exports = dropDown