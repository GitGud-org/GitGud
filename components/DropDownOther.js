const React = require("react");
const { useEffect, useState, useRef } = require("react");
const { Text, Box, Newline } = require("ink");
const SelectInput = require("ink-select-input-horizontal").default;
const { execSync, exec } = require("child_process");
const importJsx = require("import-jsx");
const TreeTab = importJsx('./TreeTab')
const Stash = importJsx('./Stash')
const CommitRevert = importJsx('./CommitRevert')
const StyleSettings = importJsx("./StyleSettings");
const SquashBranch = importJsx("./SquashBranch");

const popStash = require('../actions/undoStash')

//Creates the switch case for the 'Other' Tab.

const dropDown = ({ refreshTab, style, onStyleChange }) => {
    const { accentColor, defaultColor, gitTreeColor } = style;
    const [currentDrop, setCurrentDrop] = useState('')

    const handleSelect = (item) => {
        setCurrentDrop(item.value)
        if(item.value === 'undoStash') {
            popStash()
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
        },
        {
            label: 'Undo Stash',
            value: 'undoStash'
        },
        {
            label: 'Undo Commit',
            value: 'undoCommit'
        },
        { label: "Style Settings", value: "styleSettings" },
        { label: "Squash Branch", value: "squashBranch" }
    ]
    switch (currentDrop) {
        case "styleSettings":
            return <StyleSettings style={style} onStyleChange={onStyleChange} />;
        case "squashBranch":
            return <SquashBranch defaultColor={defaultColor} accentColor={accentColor} />;
        case 'fullLogTree':
            return (
                <Box flexDirection='column' marginLeft='109'>
                    <SelectInput items={items} isFocused={false} displayDirection='column' defaultColor={defaultColor} accentColor={accentColor}/>
                    <TreeTab gitTreeColor={gitTreeColor} />
                </Box>
            )
        case 'stashChanges':
            return (
                <Box flexDirection='column' marginLeft='109'>
                    <SelectInput items={items} isFocused={false} displayDirection='column' defaultColor={defaultColor} accentColor={accentColor}/>
                    <Stash refreshTab={refreshTab} />
                </Box>
            )
        case 'undoStash': 
            return (
                <Box flexDirection='column' marginLeft='109'>
                    <SelectInput items={items} isFocused={false} displayDirection='column' defaultColor={defaultColor} accentColor={accentColor}/>
                    <popStash refreshTab={refreshTab} />
                </Box>
            )
        case 'undoCommit':
            return (
                <Box flexDirection='column' marginLeft='109'>
                    <SelectInput items={items} isFocused={false} displayDirection='column' defaultColor={defaultColor} accentColor={accentColor}/>
                    <CommitRevert refreshTab={refreshTab} />
                </Box>
            )
        default:
            return (
                <Box flexDirection="column" marginLeft={1}>
                    <SelectInput items={items} onSelect={handleSelect} displayDirection='column' defaultColor={defaultColor} accentColor={accentColor}/>
                    <Newline />
                    <Text color='gray'>Press ESC to go back</Text>
                </Box>
            )
    }
};

module.exports = dropDown
