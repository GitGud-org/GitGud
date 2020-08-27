const {execSync}=require("child_process")
const {stat} = require("fs")
const { useState } = require('react')
const branchList = require('./gitBranch')
const TextInput = require('ink-text-input').default
const { render, Box, Text } = require('ink')

const DeleteTab = (props) => {

    let branches = branchList()
    let pull = execSync(
        'git branch -D ${query}'
    )
    
    // return (
    //     <Box>
    //         <Text>Branches: ${branches}</Text>
    //     </Box>
    // )
}

module.exports = DeleteTab