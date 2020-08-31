const gitStatusProcess = (gitStatusOutput) => {
	let gitStatusOutputSorted = {
		staged: [],
		unstaged: [],
	}

	gitStatusOutput.split('\n').forEach(line => {
		const tag1 = line.slice(0,1)
		const tag2 = line.slice(1,2)

		if (tag1 !== ' ' && tag1 !== '?' && line.length) {
			gitStatusOutputSorted.staged.push(`- ${line.slice(3)} (${line.slice(0,2)})`)
		}
		if (tag2 !== ' ' && line.length) {
			gitStatusOutputSorted.unstaged.push(`- ${line.slice(3)} (${line.slice(0,2)})`)
		}
		})

	return gitStatusOutputSorted
}

module.exports = gitStatusProcess
