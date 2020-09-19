const {showFlag} = require('../styleFile')

const gitStatusProcess = (gitStatusOutput) => {
	let gitStatusOutputSorted = {
		staged: [],
		unstaged: [],
	}


	//Checks and outputs what the status of a file is.
	//Specifically, modified/deleted/added files
	gitStatusOutput.split('\n').forEach(line => {
		const tag1 = line.slice(0,1)
		const tag2 = line.slice(1,2)
		const tags = line.slice(0,2)
		let displayTags = ''
		if (showFlag === true) displayTags = `(${tags})`

		if (tag1 !== ' ' && tag1 !== '?' && line.length) {
			gitStatusOutputSorted.staged.push(`- ${line.slice(3)} ${displayTags}`)
		}
		if (tag2 !== ' ' && line.length) {
			gitStatusOutputSorted.unstaged.push(`- ${line.slice(3)} ${displayTags}`)
		}
		})

	return gitStatusOutputSorted
}

module.exports = gitStatusProcess
