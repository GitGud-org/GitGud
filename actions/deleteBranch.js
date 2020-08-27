const React = require("react");
const { useState } = require("react");
const { render, Box, Text } = require("ink");
const { execSync } = require("child_process");
const TextInput = require("ink-text-input").default;

const DeleteTab = (props) => {
    const [del, setDelete] = useState('')

    let {refresh} = props

    let branchList = execSync('git branch').toString().split('\n')
    let branches = branchList

    const handleSubmit = () => {
        execSync('git branch -D '+ del +'')
        refresh('')
    }
    return (
        <Box>
            <Text>Branches: {branches}</Text>
            <Text>Delete Branch: </Text>
            <TextInput value={del} onChange={setDelete} onSubmit={handleSubmit} />
        </Box>
    )
    
    
    
    
    
    //console.log(branches)
    // const [query, setQuery] = useState('')
    // // console.log(branchList())
    // const deleteTab = () => {
    //     let branches = branchList()
    //     if (branches.includes(query)) {
    //         execSync(`git branch -D ${query}`)
    //     } else {
    //         console.log('fail')
    //     }
    //     props.handleSelect(props.item)
    // }
    // return (
    //     <Box>
    //         <Box>
    //             <Text>Temp</Text>
    //         </Box>
    //         <TextInput value={query} onChange={setQuery} onSubmit={deleteTab} />
    //     </Box>
    // )
}

module.exports = DeleteTab