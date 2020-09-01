const React = require("react");
const { useState } = require("react");
const { render, Box, Text, Newline } = require("ink")
const { execSync } = require("child_process");

const TreeTab = () => {
    //displays full git log tree under access full log tree
    let tree = execSync('git log --all --decorate --oneline --graph').toString()
    let largeTree = tree
    return (
        <Box flexDirection='column'>
            <Box><Text> </Text></Box>
            <Box>
                <Text color='#f09e8c'>{largeTree}</Text>
            </Box>
        </Box>
    )
}
module.exports = TreeTab