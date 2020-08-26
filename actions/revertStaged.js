const {execSync}=require("child_process")
const {stat} = require("fs")

const revertTab = () => {
    let revert = execSync(
        //pushes staged files to whatever branch that you are on
        'git reset'
    )
}

module.exports = revertTab