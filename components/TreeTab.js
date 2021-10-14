const React = require("react");
const { Box, Text } = require("ink")
const { execSync } = require("child_process");
const { fullProjectTreeColor } = require("../styleFile");

const TreeTab = () => {
    //displays full git log tree under access full log tree
    let tree = execSync('git log --all --decorate --oneline --graph').toString()
    let largeTree = tree
    return (
        <Box flexDirection='column'>
            <Box><Text> </Text></Box>
            <Box>
                <Text color={fullProjectTreeColor}>{largeTree}</Text>
            </Box>
            <Text color='gray'>   Press ESC to go back </Text>
        </Box>
    )
}
module.exports = TreeTab
