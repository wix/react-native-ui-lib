// Categorizes like scripts/release/prReleaseNotesCommon.js: by PR head-branch
// prefix, using the PR body's "## Changelog" section when present.
const CATEGORIES = [
  { title: 'Features', branch: 'feat/' },
  { title: 'Web support', branch: 'web/' },
  { title: 'Fixes', branch: 'fix/' },
  { title: 'Maintenance & Infra', branch: 'infra/' },
  { title: 'Other', branch: '' },
];
const SILENT = ['none', 'n/a', 'na'];

function escapeMarkdown(value) {
  return String(value ?? '')
    .replace(/[<>]/g, (char) => (char === '<' ? '&lt;' : '&gt;'))
    .replace(/[\\`*_{}\[\]()#+!|~]/g, '\\$&');
}

function categoryOf(pr) {
  const branch = String(pr.head?.ref ?? '').toLowerCase();
  return CATEGORIES.find((category) => branch.startsWith(category.branch)).title;
}

// Returns the Changelog section lines, [] when the section is absent, or null
// when the PR explicitly opts out (none / n/a / na).
function changelogOf(body) {
  const sections = String(body ?? '').replace(/<!--[\s\S]*?-->/g, '').split(/^##\s+/m);
  const section = sections.find((text) => /^changelog\s*$/im.test(text.split('\n')[0]));
  if (!section) return [];
  const lines = section.split('\n').slice(1).map((line) => line.trim()).filter(Boolean);
  return lines.length === 1 && SILENT.includes(lines[0].toLowerCase()) ? null : lines;
}

function comparePRs(a, b) {
  return (
    a.number - b.number ||
    String(a.title).localeCompare(String(b.title)) ||
    String(a.user?.login).localeCompare(String(b.user?.login))
  );
}

function renderNotes({
  version,
  previousTag,
  sourceSha,
  pullRequests,
  repository = 'wix/react-native-ui-lib',
}) {
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository)) throw new TypeError('Invalid GitHub repository');
  if (typeof version !== 'string' || !version) throw new TypeError('A release version is required');
  if (!/^[a-f0-9]{40}$/i.test(sourceSha))
    throw new TypeError('A full source commit SHA is required');

  const byNumber = new Map();
  for (const pr of pullRequests || []) {
    if (!Number.isSafeInteger(pr.number) || pr.number < 1 || !pr.merged_at) continue;
    const changelog = changelogOf(pr.body);
    if (changelog === null) continue;
    const candidate = { ...pr, _lines: changelog.length ? changelog : [String(pr.title ?? '')] };
    const existing = byNumber.get(pr.number);
    if (!existing || comparePRs(candidate, existing) < 0) byNumber.set(pr.number, candidate);
  }

  const prs = [...byNumber.values()].sort((a, b) => a.number - b.number);
  const lines = [
    `# ${escapeMarkdown(version)}`,
    '',
    `Source commit: [${sourceSha}](https://github.com/${repository}/commit/${sourceSha})`,
  ];
  if (previousTag) {
    lines.push(
      `Full changes: [${escapeMarkdown(
        previousTag
      )}...${sourceSha}](https://github.com/${repository}/compare/${encodeURIComponent(
        previousTag
      )}...${sourceSha})`
    );
  }

  for (const category of CATEGORIES) {
    const categoryPRs = prs.filter((pr) => categoryOf(pr) === category.title);
    if (!categoryPRs.length) continue;
    lines.push('', `## ${category.title}`);
    for (const pr of categoryPRs) {
      const link = `[#${pr.number}](https://github.com/${repository}/pull/${pr.number})`;
      const author = pr.user?.login ? ` — @${escapeMarkdown(pr.user.login)}` : '';
      for (const line of pr._lines) lines.push(`- ${escapeMarkdown(line)} (${link})${author}`);
    }
  }
  return `${lines.join('\n')}\n`;
}

module.exports = { renderNotes, changelogOf };
