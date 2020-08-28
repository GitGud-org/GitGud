const gitStatusProcess = (gitStatusOutput) => {
	let gitStatusOutputSorted = {}

	gitStatusOutputSorted.staged = gitStatusOutput.split('\n').filter(line => {
		let tag = line.slice(0,2)
		return (
			tag === 'M ' ||
			tag === 'MD' ||
			tag === 'A '
			)
		})
		.map(line => {
		return `- ${line.slice(3)} (${line.slice(0,2)})`
	})
	.join('\n')

	gitStatusOutputSorted.unstaged = gitStatusOutput.split('\n').filter(line => {
		let tag = line.slice(0,2)
		return !((
			tag === 'M ' ||
			tag === 'MD' ||
			tag === 'A '
		) || line === '')
	})
	.map(line => {
		return `- ${line.slice(3)} (${line.slice(0,2)})`
	})
	.join('\n')

	return gitStatusOutputSorted
}

module.exports = gitStatusProcess
