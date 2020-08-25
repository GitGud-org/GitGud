const { execSync } = require('child_process')
const { stat } = require('fs')

const branchVisual = () => {

    let gitBranchVisual = execSync(
        //runs the branch visual command
        //useful git snippets to maybe implement later down the line;
            //git shortlog
            //git log --oneline -(to be used for bottom of git branch)
        // 'git log --all --decorate --oneline --graph',
        'git log --pretty=format:"%s" --graph --decorate', //temporarily added the %s back in
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
    // if(gitBranchVisual.includes('*')){
    //     sortedBranchVisual.astrix = gitBranchVisual.slice(0,1)
    // }//for loop
    sortedBranchVisual.astrix = gitBranchVisual.slice(0,1)
    sortedBranchVisual.sorted = gitBranchVisual.slice(1).split('\n', 14).join('\n')
    return sortedBranchVisual
}

module.exports = branchVisual