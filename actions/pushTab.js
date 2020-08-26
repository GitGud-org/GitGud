const {execSync}=require("child_process")
const {stat} = require("fs")
const gitBranchCall = require('../currentBranch')

const pushTab = () => {
    let branch = gitBranchCall()
    let push = execSync(
        //pushes staged files to whatever branch that you are on
        'git push -u origin ' + branch + ''
    )

}

module.exports = pushTab