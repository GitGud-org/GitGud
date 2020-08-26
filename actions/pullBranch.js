const {execSync}=require("child_process")
const {stat} = require("fs")
const gitBranchCall = require('../currentBranch')

const pullTab = () => {
    let branch = gitBranchCall()
    let pull = execSync(
        //pushes staged files to whatever branch that you are on
        'git pull origin ' + branch + ''
    )

}

module.exports = pullTab