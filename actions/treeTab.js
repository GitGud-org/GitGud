const {execSync}=require("child_process")
const {stat} = require("fs")

const treeTab = () => {
    let tree = execSync(
        //get's full tree
        'git log --all --decorate --oneline --graph'
    )
}


module.exports = treeTab