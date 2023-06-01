const fs = require('fs');
const _ = require('lodash');
const childProcess = require('child_process');
const fetch = require('node-fetch');
const readline = require('readline');

function fetchLatestReleaseDate(version) {
  const relesae = childProcess.execSync(`gh release view ${version}`).toString();
  const releaseMetaData = relesae.split('--')[0];
  const createDate = _.flow(data => _.split(data, '\n'),
    linesData => _.find(linesData, l => l.startsWith('created')),
    createdData => _.split(createdData, '\t'),
    _.last)(releaseMetaData);

  return new Date(createDate);
}

function parsePR(prContent) {
  const sections = prContent.split('##');

  const PRInfo = {};
  sections.forEach(section => {
    const lines = section.trim().split('\r\n');
    const title = lines.splice(0, 1)[0].toLowerCase();
    const body = lines.join('\r\n');
    if (title && body) {
      PRInfo[title] = body;
    }
  });

  return PRInfo;
}

async function fetchMergedPRs(postMergedDate, repo, githubToken) {
  console.log('Find all merged PRs since - ', postMergedDate);
  const page = 1;
  // process.stderr.write(`Loading page ${page}..`);
  const url = `https://api.github.com/repos/${repo}/pulls?state=closed&base=master&page=${page}&per_page=100`;
  const headers = {Authorization: `token ${githubToken}`};
  const response = await fetch(url, {headers});
  const PRs = await response.json();

  if (PRs.message) {
    console.log('\x1b[31m', 'Something went wrong', PRs.message);
    return;
  }

  const relevantPRs = _.flow(prs => _.filter(prs, pr => !!pr.merged_at && new Date(pr.merged_at) > postMergedDate),
    prs => _.sortBy(prs, 'merged_at'),
    prs =>
      _.map(prs, pr => ({
        state: pr.state,
        merged_at: pr.merged_at,
        html_url: pr.html_url,
        branch: pr.head.ref,
        number: pr.number,
        title: pr.title,
        info: parsePR(pr.body)
      })))(PRs);

  return relevantPRs;
}

function isSilent(pr) {
  if (!pr.info.changelog) {
    return true;
  } else {
    const changelog = pr.info.changelog.toLowerCase();
    if (changelog === 'none' || changelog === 'n/a') {
      return true;
    }
  }

  return false;
}

function getPRsByType(PRs) {
  const silentPRs = [],
    features = [],
    web = [],
    fixes = [],
    infra = [],
    others = [];

  PRs.forEach(pr => {
    if (isSilent(pr)) {
      silentPRs.push(pr);
    } else if (pr.branch.startsWith('feat/')) {
      features.push(pr);
    } else if (pr.branch.startsWith('web/')) {
      web.push(pr);
    } else if (pr.branch.startsWith('fix/')) {
      fixes.push(pr);
    } else if (pr.branch.startsWith('infra/')) {
      infra.push(pr);
    } else {
      others.push(pr);
    }
  });

  return {silentPRs, features, web, fixes, infra, others};
}

function getLine(log, requester, prNumber) {
  return `• ${log}${requester}${prNumber} \n`;
}

function getAdditionalInfo(pr) {
  // TODO: Remove `jira issue` once fully migrated (has to remain for backwards compatibility)
  let additionalInfo = pr.info['jira issue'] || pr.info['Additional info'];
  if (additionalInfo === undefined || additionalInfo.toLowerCase() === 'none' || additionalInfo.includes('???')) {
    additionalInfo = '';
  } else {
    additionalInfo = ` (${additionalInfo})`;
  }

  return additionalInfo;
}

function getEntry(pr) {
  let releaseNotes = '';
  const log = pr.info.changelog || pr.title;
  const additionalInfo = getAdditionalInfo(pr);

  const prNumber = ` (#${pr.number})`;
  if (log.includes('\r\n')) {
    log.split('\r\n').forEach(l => {
      releaseNotes += getLine(l, additionalInfo, prNumber);
    });
  } else {
    releaseNotes = getLine(log, additionalInfo, prNumber);
  }

  return releaseNotes;
}

function getTitle(title) {
  return `\n\n${title}\n\n`;
}

function getReleaseNotesForType(PRs, title) {
  let releaseNotes = getTitle(title);
  PRs.forEach(pr => {
    releaseNotes += getEntry(pr);
  });

  return releaseNotes;
}

async function _generateReleaseNotes(latestVersion, newVersion, githubToken, prefix, repo, header) {
  const latestReleaseDate = fetchLatestReleaseDate(latestVersion);
  const PRs = await fetchMergedPRs(latestReleaseDate, repo, githubToken);
  if (!PRs) {
    return;
  }

  const {silentPRs, features, web, fixes, infra, others} = getPRsByType(PRs);

  let releaseNotes = header;

  releaseNotes += getTitle(':rocket: What’s New?');

  releaseNotes += getReleaseNotesForType(features, ':gift: Features');

  releaseNotes += getReleaseNotesForType(web, ':spider_web: Web support');

  releaseNotes += getReleaseNotesForType(fixes, ':wrench: Fixes');

  releaseNotes += getReleaseNotesForType(infra, ':gear: Maintenance & Infra');

  releaseNotes += getTitle(':bulb: Deprecations & Migrations');

  releaseNotes += getReleaseNotesForType(others, 'OTHERS');

  releaseNotes += getReleaseNotesForType(silentPRs,
    '// Silent - these PRs did not have a changelog or were left out for some other reason, is it on purpose?');

  fs.writeFileSync(`${process.env.HOME}/Downloads/${prefix}-release-notes_${newVersion}.txt`, releaseNotes, {
    encoding: 'utf8'
  });

  console.log(`\x1b[1m\x1b[32m✔\x1b[0m \x1b[32m${prefix}-release-notes.txt was successfully written to ${process.env.HOME}/Downloads\x1b[0m \x1b[1m\x1b[32m✔\x1b[0m`);
}

async function generateReleaseNotes(latestVersion, newVersion, githubToken, prefix, repo, header = '') {
  let latestVer, newVer;
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(`What is the current version? `, currentV => {
    rl.question('What is the next version for release? ', newV => {
      latestVer = currentV || latestVersion;
      newVer = newV || newVersion;
      rl.close();
    });
  });

  rl.on('close', () => {
    console.info(`Current latest version is v${latestVer}`);
    console.info(`Generating release notes out or PRs for v${newVer}`);
    _generateReleaseNotes(latestVer, newVer, githubToken, prefix, repo, header);
  });
}

module.exports = {generateReleaseNotes};
