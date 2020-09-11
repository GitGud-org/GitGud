const { execSync } = require('child_process')

const gitBranchVisualPull = () => {
	let gitBranchVisualPull = ''
	try {

		gitBranchVisual = execSync(
			//runs the branch visual command
			//useful git snippets to maybe implement later down the line;
			//git shortlog
			//git log --oneline -(to be used for bottom of git branch)
			// 'git log --all --decorate --oneline --graph',
			//temporarily added the %s back in
			'git log --pretty=format:"%s" --graph --decorate'
			).toString()

		} catch (error) {
			return ''
		}
		return gitBranchVisual
}

module.exports = gitBranchVisualPull
