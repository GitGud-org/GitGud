const React = require("react");
const { useEffect, useState, useRef } = require("react");
const { Text, Box, Newline } = require("ink");
const SelectInput = require("ink-select-input").default;
const { execSync, exec } = require("child_process");
const importJsx = require("import-jsx");
const TreeTab = importJsx('./TreeTab')
const Stash = importJsx('./stash')

//Creates the switch case for the 'Other' Tab. 

const dropDown = ({ refreshTab }) => {
    const [currentDrop, setCurrentDrop] = useState('')

    const handleSelect = (item) => {
        setCurrentDrop(item.value)
        if (item.label === 'fullLogTree') {
            TreeTab() //Calls on ./actions/TreeTab for functionality
        }
        if (item.label === 'stashChanges') {
            Stash() //Calls on ./actions/Stash for functionality
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
    switch (currentDrop) {
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
            return (
                // Replace "marginLeft='109'" for optimized solution later down the line. 
                <Box flexDirection="column" marginLeft='109' > 
                    <SelectInput items={items} onSelect={handleSelect} />
                    <Newline />
                    <Text color='gray'>Press ESC to go back</Text>
                </Box>
            )
    }
};

module.exports = dropDown