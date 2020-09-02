const React = require('react')
const { useEffect, useState } = require('react')
const { Text, Box, Newline } = require('ink')
const SelectInput = require('ink-select-input').default
const { execSync, exec } = require('child_process')

//drop-down menu for full log tree/stash/merge

const stash = ({refreshTab}) => {
    const [gitStash, setStash] = useState('')

    // let { refreshTab } = props

    let output = execSync('git stash').toString()

    // useEffect(() => {
    //     let StashGit = execSync(
    //         'git stash',
    //     (error, stdout, stderr) => {
    //         if(error) {
    //             console.error(`exec error: ${error}`)
    //             return
    //         }
    //         return stdout
    //     }
    //     ).toString()

    //     setStash(StashGit)
    // })
    // const options = [{label: 'Access Full Log Tree', value: 'Access Full Log Tree'}]
    return (
        <Box flexDirection='column'>
            <Box><Text> </Text></Box>
            <Box>
                <Text>{output}</Text>
            </Box>
        </Box>
    )

}

module.exports = stash;