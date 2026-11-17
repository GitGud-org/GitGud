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
const { flushPassiveEffects } = require('ink/build/reconciler').default;
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
    // Ink installs its input listeners in passive effects.
    flushPassiveEffects();
    stdin.write(value);
    flushPassiveEffects();
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

    git('branch', 'branch/team');
    git('branch', 'Feature/Case');
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
    await key('feature/case');
    await key(enter);
    assert.strictEqual(git('branch', '--show-current'), 'Feature/Case');
    assert.strictEqual(git('branch', '--list', 'feature/case'), '');

    await move(5);
    await key(enter);
    await has(/Delete Branch:/);
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

    await move(6);
    await key(enter);
    await key(enter);
    await has(/initial "quoted" \$literal.*Press ESC to go back/);
    await key(esc);
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
