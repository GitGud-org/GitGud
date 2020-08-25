const { execSync } = require('child_process')
const { stat } = require('fs')

const branchVisualText = () => {

    let gitBranchText = execSync(
        // 'git log --pretty=format:"%h" --graph --decorate',
        'git log --pretty=format:"%s"',
        (error, stdout, stderr) => {
            if(error) {
                console.error(`exec errorL ${error}`)
                return
            }
            return stdout
        }
    ).toString()

    let sortedText = {}
    
    // sortedBranchVisual.sorted = gitBranchVisual.split('\n')[.map(line => {
    //     return `${line.slice(0,10)}`
    // }).join(`\n`)]
    sortedText.sorted = gitBranchText.split('\n', 14).join('\n')

    return sortedText
}

module.exports = branchVisualText