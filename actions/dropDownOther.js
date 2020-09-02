const React = require("react");
const { useEffect, useState, useRef } = require("react");
const { Text, Box, Newline } = require("ink");
const SelectInput = require("ink-select-input").default;
const { execSync, exec } = require("child_process");

const dropDown = ({ refreshTab }) => {
    const [gitOther, setOther] = useState('')

    useEffect(() => {
        let gitOutput = execSync(`git log`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`)
                return
            }
            return stdout
        }
        ).toString()
        setOther(gitOutput)
    })


    const list = [
        {
            label: 'Access Full Log Tree',
            value: 'fullLogTree'
        },
        {
            label: 'Stash Changes',
            value: 'stashChanges'
        }
    ]

    const handleSelect = (item) => {
        if (item.label === 'fullLogTree') {
            let tree = execSync('git log --all --decorate --oneline --graph').toString()
            return (
                <Box flexDirection='column'>
                    <Box><Text> </Text></Box>
                    <Box>
                        <Text color='#f09e8c'>{tree}</Text>
                    </Box>
                    <Text color='gray'>   Press ESC to go back </Text>
                </Box>
            )
        }
    }
    return (
        <Box flexDirection="column" marginLeft='3' >
            <SelectInput items={list} onSelect={handleSelect} />
            <Newline />
            <Text color='gray'>Press ESC to go back</Text>
        </Box>
    )
};

module.exports = dropDown