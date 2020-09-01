const {execSync}=require("child_process")
const {stat} = require("fs")
const gitBranchCall = require('../currentBranch')

const pullTab = () => {
    let branch = gitBranchCall()
    let pull = execSync(
        //pulls the most recent commit/push from the branch you are currently on
        'git pull origin ' + branch + ''
    )

}

module.exports = pullTab