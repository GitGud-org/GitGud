const { execSync } =require('child_process')
const React = require('react')

const popStash = () => {
    let undoStash = execSync(
        'git stash pop'
    )
}

module.exports = popStash