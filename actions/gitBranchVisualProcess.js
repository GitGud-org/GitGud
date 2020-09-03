const { execSync } = require('child_process')

const gitBranchVisualProcess = (gitBranchVisualString, height, appWidth) => {

  //Splits text from the gitBranch section to format the astrix/commit symbol
    let totalWidth = Math.floor((appWidth * 1.25))
    let sortedBranchVisual = {}
    sortedBranchVisual.sorted = gitBranchVisualString.split('\n', height-3).map(line => line.slice(0, totalWidth)).join('\n')

    return sortedBranchVisual
}

module.exports = gitBranchVisualProcess
