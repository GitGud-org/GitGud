const React = require('react')
const { useEffect, useState } = require('react')
const { Text, Box, Newline } = require('ink')
const SelectInput = require('ink-select-input').default
const { execSync, exec } = require('child_process')

//stash functionality

const stash = ({ refreshTab }) => {

    let output = execSync('git stash').toString()

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