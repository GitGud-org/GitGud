const { execSync } = require('child_process')

const gitBranchVisualProcess = (gitBranchVisualString) => {

    let sortedBranchVisual = {}

    sortedBranchVisual.astrix = gitBranchVisualString.slice(0,1)
		sortedBranchVisual.sorted = gitBranchVisualString.slice(0).split('\n', 14).join('\n')

    return sortedBranchVisual
}

module.exports = gitBranchVisualProcess
