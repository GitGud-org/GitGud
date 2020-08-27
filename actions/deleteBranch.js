const React = require("react");
const { useState } = require("react");
const { render, Box, Text, Newline } = require("ink");
const { execSync } = require("child_process");
const TextInput = require("ink-text-input").default;

const DeleteTab = (props) => {
    const [del, setDelete] = useState('')

    let { refreshTab } = props

    let branchList = execSync('git branch').toString().split('\n')
    let branches = branchList

    const handleSubmit = () => {
        execSync('git branch -D ' + del + '')
        refreshTab('')
    }
    return (
        <Box flexDirection='column'>
            <Box>
                <Text color='red'>Branches: </Text>
                <Text>{branches}</Text>
            </Box>
            <Box >
                <Box>
                    <Text color='red'>Delete Branch: </Text>
                    <TextInput value={del} onChange={setDelete} onSubmit={handleSubmit} />
                </Box>
            </Box>
        </Box>
    )
}

module.exports = DeleteTab