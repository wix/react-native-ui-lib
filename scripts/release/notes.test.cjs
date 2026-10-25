const { test } = require('node:test');
const assert = require('node:assert/strict');
const { renderNotes, changelogOf } = require('./notes.cjs');

const sha = 'a'.repeat(40);
const template = (changelog, extra = '') =>
  `## Description\n<!--\nEnter description...\n-->\nSome details\n\n## Changelog\n<!--\nAdd a quick message\n-->\n${changelog}\n\n## Additional info\n${extra}\n`;
function pr(number, title, branch, body, extra = {}) {
  return {
    number,
    title,
    body,
    head: { ref: branch },
    html_url: 'https://example.com/not-canonical',
    user: { login: 'contributor' },
    merged_at: '2026-01-02T03:04:05Z',
    ...extra,
  };
}

test('changelog section parsing ignores template comments and recognizes silent markers', () => {
  assert.deepEqual(changelogOf(template('Button - add size prop')), ['Button - add size prop']);
  assert.deepEqual(changelogOf(template('Line one\r\nLine two')), ['Line one', 'Line two']);
  assert.deepEqual(changelogOf(template('')), []);
  assert.deepEqual(changelogOf('no sections here'), []);
  assert.deepEqual(changelogOf(undefined), []);
  for (const silent of ['none', 'N/A', 'na']) assert.equal(changelogOf(template(silent)), null);
});

test('renders branch-prefix categories, changelog text, canonical links, source and compare commits', () => {
  const markdown = renderNotes({
    version: '9.1.4',
    previousTag: 'react-native-ui-lib@9.1.3',
    sourceSha: sha,
    pullRequests: [
      pr(12, 'fix: Dialog', 'fix/dialog-touch', template('Dialog - prevent animation interruption')),
      pr(4, 'feat: Button', 'feat/button-size', template('Button - add size prop')),
      pr(7, 'web: Picker', 'web/picker', template('Picker - web support')),
      pr(9, 'infra: CI', 'infra/ci', template('')),
      pr(15, 'Uncategorized PR', 'random-branch', template('Two\nlines')),
      pr(3, 'silent', 'feat/silent', template('none')),
      pr(6, 'not merged', 'feat/x', template('Never shipped'), { merged_at: null }),
    ],
  });
  assert.match(markdown, /# 9\.1\.4/);
  assert.match(markdown, new RegExp(`Source commit: \\[${sha}\\]`));
  assert.match(markdown, /compare\/react-native-ui-lib%409\.1\.3\.\.\.[a-f0-9]{40}/);
  assert.match(markdown, /## Features\n- Button - add size prop \(\[#4\]\(https:\/\/github\.com\/wix\/react-native-ui-lib\/pull\/4\)\) — @contributor/);
  assert.match(markdown, /## Web support\n- Picker - web support/);
  assert.match(markdown, /## Fixes\n- Dialog - prevent animation interruption/);
  assert.match(markdown, /## Maintenance & Infra\n- infra: CI \(/, 'title when the changelog section is empty');
  assert.match(markdown, /## Other\n- Two \(\[#15\][^\n]*\n- lines \(\[#15\]/);
  assert.doesNotMatch(markdown, /silent|Never shipped|example\.com/);
  assert.ok(markdown.indexOf('## Features') < markdown.indexOf('## Fixes'));
});

test('omits unmerged PRs and deduplicates by number deterministically', () => {
  const markdown = renderNotes({
    version: '9.1.4',
    previousTag: '',
    sourceSha: sha,
    pullRequests: [
      pr(8, 'z duplicate', 'fix/a', ''),
      pr(6, 'not merged', 'fix/b', '', { merged_at: null }),
      pr(8, 'a duplicate', 'fix/a', ''),
    ],
  });
  assert.equal((markdown.match(/\/pull\/8/g) || []).length, 1);
  assert.match(markdown, /- a duplicate/);
  assert.doesNotMatch(markdown, /not merged|z duplicate|Full changes/);
});

test('escapes title, author, and version content and uses the requested canonical repository', () => {
  const markdown = renderNotes({
    version: '9.1.4<script>',
    previousTag: 'release/9.1.3',
    sourceSha: sha,
    repository: 'example/project',
    pullRequests: [
      pr(2, 'bad ](https://evil.test) <img src=x> **title**', 'feat/evil', '', {
        user: { login: 'name](javascript:alert(1))' },
      }),
    ],
  });
  assert.match(markdown, /# 9\.1\.4&lt;script&gt;/);
  assert.match(markdown, /https:\/\/github\.com\/example\/project\/pull\/2/);
  assert.match(markdown, /bad \\\]\\\(https:\/\/evil\.test\\\)/);
  assert.match(markdown, /&lt;img src=x&gt;/);
  assert.match(markdown, /\\\*\\\*title\\\*\\\*/);
  assert.match(markdown, /@name\\\]\\\(javascript:alert\\\(1\\\)\\\)/);
  assert.throws(() => renderNotes({ version: '1.0.0', sourceSha: 'short', pullRequests: [] }));
});
