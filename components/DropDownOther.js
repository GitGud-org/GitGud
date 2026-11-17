const React = require("react");
const { useState } = require("react");
const { Text, Box, Newline, useInput } = require("ink");
const SelectInput = require("ink-select-input-horizontal").default;
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

    useInput((_, key) => {
        if (key.escape) refreshTab("");
    }, { isActive: currentDrop !== "styleSettings" });

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
    if (currentDrop === "styleSettings") {
        return <StyleSettings style={style} onStyleChange={onStyleChange} onBack={() => setCurrentDrop("")} />;
    }
    if (currentDrop === "squashBranch") {
        return <SquashBranch defaultColor={defaultColor} accentColor={accentColor} />;
    }

    let content;
    switch (currentDrop) {
        case 'fullLogTree':
            content = <TreeTab gitTreeColor={gitTreeColor} />;
            break;
        case 'stashChanges':
            content = <Stash refreshTab={refreshTab} />;
            break;
        case 'undoCommit':
            content = <CommitRevert refreshTab={refreshTab} />;
            break;
        default:
            content = (
                <>
                    <Newline />
                    <Text color='gray'>Press ESC to go back</Text>
                </>
            );
    }
    return (
        <Box flexDirection="column" marginLeft={1}>
            <SelectInput items={items} isFocused={!currentDrop} onSelect={handleSelect}
                displayDirection="column" defaultColor={defaultColor} accentColor={accentColor} />
            {content}
        </Box>
    );
};

module.exports = dropDown
