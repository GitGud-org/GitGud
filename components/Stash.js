const React = require('react')
const { useEffect, useState } = require('react')
const { Text, Box, Newline } = require('ink')
const SelectInput = require('ink-select-input-horizontal').default
const { execSync, exec } = require('child_process')

//Stash functionality

const Stash = ({ refreshTab }) => {

    let output = execSync('git stash').toString()
    refreshTab('')
    return (
        <Box flexDirection='column'>
            <Box><Text> </Text></Box>
            <Box>
                <Text>{output}</Text>
            </Box>
        </Box>
    )
}

module.exports = Stash;