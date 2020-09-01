const {execSync}=require("child_process")
const {stat} = require("fs")

const stageFiles = () => {
    let revert = execSync(
        //stages all files
        //Used as a basis for staging files 
        'git add .'
    )
}

module.exports = stageFiles
