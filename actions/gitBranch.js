const {execSync}=require("child_process")
const {stat} = require("fs")

const branchList = () => {
    let pull = execSync(
        //pushes staged files to whatever branch that you are on
        'git branch'
    ).toString().split('\n')
}

module.exports = branchList