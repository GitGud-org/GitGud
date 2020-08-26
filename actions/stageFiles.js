const {execSync}=require("child_process")
const {stat} = require("fs")

const stageFiles = () => {
    let revert = execSync(
        //pushes staged files to whatever branch that you are on
        'git add .'
    )
}

module.exports = stageFiles
