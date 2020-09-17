const React = require('react')
const { useState } = require("react");
const { Box, Text, NewLine } = require('ink')
const { execSync, exec } =require("child_process")
const TextInput = require("ink-text-input").default;

const CommitRevert = (props) => {
    const [commitId, setCommitId] = useState("");

    let { refreshTab } = props;

    //reverts merge based on git log merge-id
    let singleBranch = execSync(
        //most recent commit id
        'git log --all --decorate --oneline --graph'
        ).toString().split('\n', 1)
    const branchRevert = () => {
        //reverts commit
        try {
            execSync(`git revert -m 1 ${commitId}`)
        } catch (error) {
            console.error('Oops, something went wrong.')
        }
    }
    return (
        <Box flexDirection='column'>
            <Box><Text> </Text></Box>
            {/* <Box><Text>   Please be on master branch. </Text></Box> */}
            <Box><Text color='redBright'>   THIS WILL DELETE ALL FILES/CHANGES MADE IN THIS COMMIT </Text></Box>
            <Box flexDirection='row'>
                <Text>   Latest Commit Id: </Text> 
                <Text color='#f09e8c'>{singleBranch}</Text>
            </Box>
            <Box flexDirection='row'>
                <Text>   Please enter your commit Id: </Text>
                <TextInput 
                    value={commitId}
					onChange={setCommitId}
					onSubmit={branchRevert} />
            </Box>
            <Text color='gray'>   Press ESC to go back </Text>
        </Box>
    )
}

module.exports = CommitRevert