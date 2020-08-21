const { execSync } = require('child_process');
const { stat } = require('fs');

const statusOutput = () => {
    let gitStatusOutput = execSync('git status', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        return stdout.trim()
      })
      .toString()
			return gitStatusOutput
}

module.exports = statusOutput;

