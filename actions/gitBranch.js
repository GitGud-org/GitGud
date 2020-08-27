const {execSync}=require("child_process")
const {stat} = require("fs")

const branchList = () => {
    let pull = execSync(
        'git branch'
    ).toString().split('\n')
    console.log(pull)
}

module.exports = branchList