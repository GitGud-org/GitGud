//May delete this file since it isn't necessary for the reset function of stage

const {execSync}=require("child_process")
const {stat} = require("fs")

const revertTab = () => {
    let revert = execSync(
        //reverts files that have been staged
        'git reset'
    )
}

module.exports = revertTab