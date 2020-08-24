const { execSync } = require('child_process')
const { stat } = require('fs')

const branchVisual = () => {

    let gitBranchVisual = execSync(
        //runs the branch visual command
        //useful git snippets to maybe implement later down the line;
            //git shortlog
            //git log --oneline -(to be used for bottom of git branch)
        // 'git log --all --decorate --oneline --graph',
        'git log --pretty=format:"%h" --graph --decorate',
        (error, stdout, stderr) => {
            if(error) {
                console.error(`exec errorL ${error}`)
                return
            }
            return stdout
        }
    ).toString()

    let sortedBranchVisual = {}
    
    // sortedBranchVisual.sorted = gitBranchVisual.split('\n')[.map(line => {
    //     return `${line.slice(0,10)}`
    // }).join(`\n`)]
    sortedBranchVisual.sorted = gitBranchVisual.split('\n', 10).join('\n')

    return sortedBranchVisual
}

module.exports = branchVisual