const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const project = __dirname;
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'gitgud-verify-'));
process.env.GIT_CONFIG_GLOBAL = path.join(temp, 'gitconfig');
process.env.GIT_CONFIG_NOSYSTEM = '1';
process.env.LC_ALL = 'C';
const React = require('react');
const { render } = require('ink-testing-library');
const importJsx = require('import-jsx');
const homedir = os.homedir;
os.homedir = () => temp;
const { loadStyle } = require('./stylePreferences');
os.homedir = homedir;
const App = importJsx('./ui');
const { planSquash, squashBranch } = require('./actions/squashBranch');
const graph = require('./actions/gitBranchVisualPull');
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const right = '\x1b[C';
const down = '\x1b[B';
const backspace = '\x7f';
const enter = '\r';
const esc = '\x1b';

async function waitForFrame(lastFrame, expected, absent) {
  const deadline = Date.now() + 5000;
  let frame;
  do {
    frame = (lastFrame() || '').replace(/\s+/g, ' ');
    if (expected.test(frame) && (!absent || !absent.test(frame))) return;
    await wait(10);
  } while (Date.now() < deadline);
  assert.fail(`Expected ${expected}${absent ? ` without ${absent}` : ''} in: ${frame}`);
}

function removeDirectory(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) removeDirectory(target);
    else fs.unlinkSync(target);
  }
  fs.rmdirSync(directory);
}

async function main() {
  const repo = path.join(temp, 'repo');
  const preferences = path.join(temp, '.gitgud');
  fs.mkdirSync(preferences);
  fs.writeFileSync(path.join(preferences, 'style.json'), '{invalid');
  assert.strictEqual(loadStyle().showLogo, true);
  fs.mkdirSync(repo);
  process.chdir(repo);
  git('init', '-q');
  git('symbolic-ref', 'HEAD', 'refs/heads/main');
  git('config', 'user.name', 'GitGud Test');
  git('config', 'user.email', 'gitgud@example.com');
  assert.strictEqual(graph(), '');
  const ui = render(React.createElement(App));
  const { stdin, lastFrame } = ui;
  const key = async value => {
    // Give React's scheduled input effects a turn before sending the next key.
    await new Promise(resolve => setImmediate(resolve));
    await new Promise(resolve => setImmediate(resolve));
    stdin.write(value);
  };
  const move = async (count, arrow = right) => {
    for (let step = 0; step < count; step++) await key(arrow);
  };
  const has = (pattern, absent) => waitForFrame(lastFrame, pattern, absent);
  try {
    await has(/Git Branch.*main/);
    await move(1);
    await key(enter);
    await has(/Commit Message/);
    await key('first attempt');
    await key(enter);
    await has(/nothing to commit/);
    await key(backspace);
    await has(/Commit Message.*first attemp/, /nothing to commit/);

    fs.writeFileSync('example.txt', 'initial content');
    git('add', 'example.txt');
    const remainingMessage = 'first attemp';
    for (let offset = 0; offset < remainingMessage.length; offset++) await key(backspace);
    const message = 'initial "quoted" $literal';
    await key(message);
    await key(enter);
    assert.strictEqual(git('log', '-1', '--format=%s'), message);
    assert.strictEqual(graph(), "* " + message);
    const base = git('rev-parse', 'HEAD');

    const filename = 'space [file].txt';
    fs.writeFileSync(filename, 'test');
    await key(enter);
    await has(/space \[file\]\.txt/);
    await key(down);
    await key(enter);
    assert.strictEqual(git('diff', '--cached', '--name-only'), filename);
    await key(enter);
    assert.strictEqual(git('diff', '--cached', '--name-only'), '');
    fs.unlinkSync(filename);
    await key(esc);

    git('branch', 'branch/team');
    git('branch', 'Feature/Case');
    git('branch', 'main-hotfix');
    git('branch', 'delete/me');
    await move(4);
    await key(enter);
    await has(/Checkout branch/);
    await key('feature/C');
    await key('\t');
    await key(enter);
    assert.strictEqual(git('branch', '--show-current'), 'Feature/Case');

    git('checkout', '-q', 'main');
    await move(4);
    await key(enter);
    await key('invalid name');
    await key(enter);
    await has(/not a valid branch name/);
    await key(backspace);
    await has(/Checkout branch:invalid nam/, /not a valid branch name/);
    await key(esc);
    await move(4);
    await key(enter);
    await key('Feature/Case');
    await key(enter);
    assert.strictEqual(git('branch', '--show-current'), 'Feature/Case');
    fs.writeFileSync(path.join(temp, 'gitgud-case-probe'), '');
    if (!fs.existsSync(path.join(temp, 'GITGUD-CASE-PROBE')) ||
        git('rev-parse', '--show-ref-format') === 'reftable') {
      await move(4);
      await key(enter);
      await key('feature/case');
      await key(enter);
      assert.strictEqual(git('branch', '--show-current'), 'feature/case');
      git('checkout', '-q', 'Feature/Case');
      git('branch', '-d', 'feature/case');
    }

    await move(4);
    await key(enter);
    await key('main');
    await key('\t');
    await key(enter);
    assert.strictEqual(git('branch', '--show-current'), 'main-hotfix');
    git('checkout', '-q', 'Feature/Case');
    git('branch', '-d', 'main-hotfix');

    await move(5);
    await key(enter);
    await has(/Delete Branch:/);
    await key(enter);
    await key('missing');
    await key(enter);
    await has(/not found/);
    await key(backspace);
    await has(/Delete Branch: missin(?:\s|$)/, /not found/);
    await key(esc);
    await move(5);
    await key(enter);
    await key('delete/');
    await key('\t');
    await key(backspace);
    await key('e');
    await key(enter);
    assert.strictEqual(git('branch', '--list', 'delete/me'), '');

    git('checkout', '-qb', 'unmerged');
    git('commit', '--allow-empty', '-qm', 'unmerged tip');
    git('checkout', '-q', 'Feature/Case');
    await move(5);
    await key(enter);
    await key('unmerged');
    await key(enter);
    await has(/not fully merged/);
    assert.strictEqual(git('branch', '--list', 'unmerged'), 'unmerged');
    await key(esc);
    git('branch', '-D', 'unmerged');

    await move(6);
    await key(enter);
    await move(2, down);
    await key(enter);
    await has(/Apply the latest stash/);
    await key(esc);
    await has(/Undo Stash/, /Apply the latest stash/);
    await key(enter);
    await key(enter);
    await has(/No stash entries found/);
    fs.appendFileSync('example.txt', '\nstashed change');
    await key('\x1b[A');
    await key(enter);
    await has(/Saved working directory/);
    await key(down);
    await key(enter);
    await key(enter);
    await has(/Dropped refs\/stash/);
    assert(fs.readFileSync('example.txt', 'utf8').includes('stashed change'));
    git('checkout', '--', 'example.txt');

    git('checkout', '-qb', 'stash-conflict');
    fs.writeFileSync('example.txt', 'stashed version');
    git('stash', 'push');
    fs.writeFileSync('example.txt', 'committed version');
    git('commit', '-qam', 'stash conflict base');
    await key(enter);
    await key(enter);
    await has(/CONFLICT.*stash entry is kept/i);
    assert(git('stash', 'list').includes('stash-conflict'));
    git('restore', '--source=HEAD', '--staged', '--worktree', '--', 'example.txt');
    git('stash', 'drop');
    git('checkout', '-q', 'Feature/Case');
    git('branch', '-D', 'stash-conflict');
    await key(esc);

    git('checkout', '-qb', 'long-log');
    for (let commit = 1; commit <= 16; commit++) {
      git('commit', '--allow-empty', '-qm', 'log entry ' + commit);
    }
    assert.strictEqual(graph(3).split('\n').length, 3);
    git('checkout', '-qb', 'log-side', 'long-log~8');
    git('commit', '--allow-empty', '-qm', 'side entry');
    git('checkout', '-q', 'long-log');
    git('merge', '--no-ff', '-qm', 'merge log branches', 'log-side');
    const continuedLine = git('log', '--all', '--graph', '--decorate', '--format=%h%d %<(240,trunc)%s')
      .split('\n')[14].trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await move(6);
    await key(enter);
    await key(enter);
    await has(/log entry 16.*Page 1/);
    await key(down);
    await has(new RegExp(continuedLine + '.*Page 2'));
    await has(/initial "quoted" \$literal.*Page 2/);
    await key(down);
    await has(/End of history/);
    await key('\x1b[A');
    await has(/log entry 16.*Page 1/);
    await key(esc);
    await has(/Access Full Log Tree.*Style Settings.*Squash Branch/, /Up\/Down to browse/);
    git('checkout', '-q', 'Feature/Case');
    await move(3, down);
    await key(enter);
    await has(new RegExp('Latest Commit Id: ' + git('rev-parse', '--short', 'HEAD')));
    await key(esc);
    await key(esc);
    git('branch', '-D', 'log-side');
    git('branch', '-D', 'long-log');
    await move(6);
    await key(enter);
    await move(4, down);
    await key(enter);
    await has(/Show logo \(On\)/);
    await key(enter);
    await has(/Show logo.*On.*Off/);
    await key(esc);
    await has(/Show logo \(On\)/);
    await key(enter);
    await move(1, down);
    await key(enter);
    await has(/Show logo saved/);
    assert.strictEqual(loadStyle().showLogo, false);
    await move(7, down);
    await key(enter);
    await move(2, down);
    await key(enter);
    assert.strictEqual(loadStyle().changeBorder, 'round');
    assert.strictEqual(loadStyle().showLogo, false);
    await key(esc);
    await has(/Access Full Log Tree.*Style Settings.*Squash Branch/, /Show logo/);
    await key(esc);
    await move(6);
    await key(enter);
    await move(5, down);
    await key(enter);
    await has(/Choose the base branch/);
    await key(enter);
    await has(/At least two commits/);
    await key(esc);
    await key(esc);

    for (let change = 0; change < 2; change++) {
      fs.appendFileSync('example.txt', '\n' + change);
      git('commit', '-qam', 'feature ' + change);
    }
    const oldTip = git('rev-parse', 'HEAD');
    const tree = git('rev-parse', 'HEAD^{tree}');
    await move(6);
    await key(enter);
    await move(5, down);
    await key(enter);
    await move(1, down);
    await key(enter);
    await has(/Squash 2 commits.*shared with main/);
    await key(enter);
    await has(/Enter a commit message/);
    await key('squashed feature');
    await key(enter);
    await has(/Squashed 2 commits/);
    assert.strictEqual(git('log', '-1', '--format=%s'), 'squashed feature');
    assert.strictEqual(git('rev-parse', 'HEAD^'), base);
    assert.strictEqual(git('rev-parse', 'HEAD^{tree}'), tree);
    assert.strictEqual(git('rev-parse', '@{1}'), oldTip);
    assert.strictEqual(git('status', '--porcelain'), '');

    const rootPlan = planSquash('');
    fs.writeFileSync('dirty', 'untracked');
    assert.throws(() => squashBranch(rootPlan, 'blocked'), /Commit or stash/);
    fs.unlinkSync('dirty');
    git('commit', '--allow-empty', '-qm', 'new head');
    assert.throws(() => squashBranch(rootPlan, 'stale plan'), /branch or base changed/);
    squashBranch(planSquash(''), 'new root');
    assert.strictEqual(git('rev-list', '--count', 'HEAD'), '1');
    assert.strictEqual(git('rev-parse', 'HEAD^{tree}'), tree);
    assert.strictEqual(git('rev-parse', 'main'), base);
    git('checkout', '--detach', '-q');
    assert.throws(() => planSquash('main'), /Check out a local branch/);
    git('symbolic-ref', 'HEAD', 'refs/heads/unborn');
    assert.strictEqual(graph(), '');
    console.log('Passed CLI integration checks for empty history, commit feedback, literal messages, tab completion, live styles, and squash.');
  } finally {
    ui.unmount();
    ui.cleanup();
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
}).finally(() => {
  process.chdir(project);
  removeDirectory(temp);
});
