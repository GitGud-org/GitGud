const React = require('react')
const { useState } = require('react')
const { Box, Text, Newline } = require('ink')
const { execSync } = require('child_process')
const TextInput = require('ink-text-input').default

// Squash all commits on the current branch into a single commit.
// Strategy: find the merge-base between HEAD and the default branch
// (tries 'main' then 'master' then 'HEAD~N' fallback), soft-reset to
// that point, then create a fresh commit with the user-supplied message.

const SquashBranch = (props) => {
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')

    let { refreshTab } = props

    // Gather branch info once at render time
    let currentBranch = ''
    let commitCount = 0
    let mergeBase = ''
    let infoError = ''

    try {
        currentBranch = execSync('git branch --show-current').toString().trim()

        // Try to find the merge-base against common default branches
        const candidates = ['main', 'master', 'develop']
        for (const base of candidates) {
            try {
                // Only use the candidate if the branch actually exists
                execSync(`git rev-parse --verify ${base}`, { stdio: 'pipe' })
                mergeBase = execSync(`git merge-base HEAD ${base}`).toString().trim()
                break
            } catch (_) {
                // Branch doesn't exist locally — try next
            }
        }

        if (!mergeBase) {
            // Fallback: count commits reachable from HEAD not yet on any remote
            const log = execSync('git log --oneline').toString().trim().split('\n')
            commitCount = log.length
            // Soft-reset to parent of first commit on branch (all commits)
            mergeBase = execSync(`git rev-parse HEAD~${commitCount - 1}^`).toString().trim()
        }

        // Count commits that will be squashed
        commitCount = parseInt(
            execSync(`git rev-list --count ${mergeBase}..HEAD`).toString().trim(),
            10
        )
    } catch (err) {
        infoError = 'Could not determine commits to squash.'
    }

    const handleSquash = () => {
        if (!message.trim()) return
        try {
            // Soft reset to merge base, keeping all changes staged
            execSync(`git reset --soft ${mergeBase}`)
            // Commit the squashed result
            execSync(`git commit -m "${message.replace(/"/g, '\\"')}"`)
            setStatus('✔ Squash complete!')
            setTimeout(() => refreshTab(''), 1500)
        } catch (err) {
            setStatus('✘ Squash failed. Make sure there are commits to squash.')
        }
    }

    return (
        <Box flexDirection='column'>
            <Box><Text> </Text></Box>

            {infoError ? (
                <Box><Text color='red'>   {infoError}</Text></Box>
            ) : (
                <Box flexDirection='column'>
                    <Box>
                        <Text color='cyan'>   Current branch: </Text>
                        <Text color='white'>{currentBranch}</Text>
                    </Box>
                    <Box>
                        <Text color='cyan'>   Commits to squash: </Text>
                        <Text color='yellowBright'>{commitCount}</Text>
                    </Box>
                </Box>
            )}

            <Box><Text> </Text></Box>

            {status ? (
                <Box>
                    <Text color={status.startsWith('✔') ? 'greenBright' : 'redBright'}>   {status}</Text>
                </Box>
            ) : (
                <Box flexDirection='row'>
                    <Text color='red'>   Squash commit message: </Text>
                    <TextInput
                        value={message}
                        onChange={setMessage}
                        onSubmit={handleSquash}
                    />
                </Box>
            )}

            <Newline />
            <Text color='gray'>   Press ESC to go back</Text>
        </Box>
    )
}

module.exports = SquashBranch
