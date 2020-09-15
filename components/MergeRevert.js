const React = require('react')
const { Box, Text, NewLine } = require('ink')
const { execSync, exec } =require("child_process")
const TextInput = require("ink-text-input").default;

const MergeRevert = (props) => {
    const [commitId, setCommitId] = useState("");


    //reverts merge based on git log merge-id
    let singleBranch = execSync(
        'git log --all --decorate --oneline --graph'
        ).toString().split('\n', 1)
    // let branchRevert = execSync(
    //     `git git revert -m 1 {}`
    // )
    return (
        <Box flexDirection='column'>
            <Box><Text> </Text></Box>
            <Box><Text>   Please be on master branch. </Text></Box>
            <Box flexDirection='row'>
                <Text>   Latest Commit Id: </Text> 
                <Text color='#f09e8c'>{singleBranch}</Text>
            </Box>
            <Box flexDirection='row'>
                <Text>   Please enter your desired commit Id: </Text>
                <TextInput 
                    value={commitId}
					onChange={setCommitId}
					onSubmit={branchRevert} />
            </Box>
            <Text color='gray'>   Press ESC to go back </Text>
        </Box>
    )
}

module.exports = MergeRevert