const React = require("react");
const { useState } = require("react");
const { Text, Box, Newline, useInput } = require("ink");
const { git, gitError } = require("../actions/git");
const SelectInput = require("ink-select-input-horizontal").default;
const importJsx = require("import-jsx");
const TreeTab = importJsx('./TreeTab')
const CommitRevert = importJsx('./CommitRevert')
const StyleSettings = importJsx("./StyleSettings");
const SquashBranch = importJsx("./SquashBranch");

//Creates the switch case for the 'Other' Tab.

const dropDown = ({ refreshTab, style, onStyleChange }) => {
    const { accentColor, defaultColor, gitTreeColor } = style;
    const [currentDrop, setCurrentDrop] = useState('')
    const [result, setResult] = useState(null);
    const backToMenu = () => setCurrentDrop("");

    const stash = (operation) => {
        try {
            const output = git(["stash", operation]).trim();
            setResult({ message: output });
        } catch (error) {
            setResult({ message: gitError(error), failed: true });
        }
    };

    useInput((_, key) => {
        if (currentDrop === "undoStash" && key.return) {
            stash("pop");
            backToMenu();
            return;
        }
        if (!key.escape) return;
        if (currentDrop) backToMenu();
        else refreshTab("");
    }, { isActive: currentDrop !== "styleSettings" });

    const handleSelect = ({ value }) => {
        setResult(null);
        if (value === "stashChanges") {
            stash("push");
            return;
        }
        setCurrentDrop(value);
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
        return <StyleSettings style={style} onStyleChange={onStyleChange} onBack={backToMenu} />;
    }
    if (currentDrop === "squashBranch") {
        return <SquashBranch defaultColor={defaultColor} accentColor={accentColor} />;
    }

    let content;
    switch (currentDrop) {
        case 'fullLogTree':
            content = <TreeTab gitTreeColor={gitTreeColor} />;
            break;
        case 'undoCommit':
            content = <CommitRevert />;
            break;
        case "undoStash":
            content = <Text>Apply the latest stash and drop it on success? Enter to confirm · Esc to cancel</Text>;
            break;
        default:
            content = (
                <>
                    <Newline />
                    {result ? <Text color={result.failed ? "red" : defaultColor}>{result.message}</Text> : null}
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
