const fs = require('fs');
const _ = require('lodash');
const childProcess = require('child_process');
const fetch = require('node-fetch');
const readline = require('readline');

const GITHUB_TOKEN = 'xxxx';
let LATEST_VERSION = '7.3.0';
let NEW_VERSION = '7.4.0';
let releaseNotes;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(`What is the current version? `, currentVersion => {
  rl.question('What is the next version for release? ', newVersion => {
    LATEST_VERSION = currentVersion || LATEST_VERSION;
    NEW_VERSION = newVersion || NEW_VERSION;
    rl.close();
  });
});

rl.on('close', () => {
  console.info(`Current latest version is v${LATEST_VERSION}`);
  console.info(`Generating release notes out or PRs for v${NEW_VERSION}`);
  run();
});

async function run() {
  const latestReleaseDate = await fetchLatestReleaseDate(LATEST_VERSION);
  const PRs = await fetchMergedPRs(latestReleaseDate);
  generateNotes(PRs);
}

async function fetchLatestReleaseDate(version) {
  const relesae = childProcess.execSync(`gh release view ${version}`).toString();
  const releaseMetaData = relesae.split('--')[0];
  const createDate = _.flow(data => _.split(data, '\n'),
    linesData => _.find(linesData, l => l.startsWith('created')),
    createdData => _.split(createdData, '\t'),
    _.last)(releaseMetaData);

  return new Date(createDate);
}

async function fetchMergedPRs(postMergedDate) {
  const page = 1;
  // process.stderr.write(`Loading page ${page}..`);
  const url =
    'https://api.github.com/repos/wix/react-native-ui-lib/pulls?' +
    `state=closed&base=master&page=${page}&per_page=100`;
  const headers = {Authorization: `token ${GITHUB_TOKEN}`};
  const response = await fetch(url, {headers});
  const PRs = await response.json();

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

const silentPRs = [];

function generateNotes(PRs) {
  const features = [],
    web = [],
    fixes = [],
    infra = [],
    others = [];

  PRs.forEach(pr => {
    if (pr.branch.startsWith('feat/')) {
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

  // What's New?
  addTitle(':rocket: What’s New?');

  // features
  addTitle(':gift: Features');
  features.forEach(addEntry);
  // web
  addTitle(':spider_web: Web support');
  web.forEach(addEntry);
  // bug fixes
  addTitle(':wrench: Fixes');
  fixes.forEach(addEntry);
  // migrations
  addTitle(':bulb: Deprecations & Migrations');
  infra.forEach(addEntry);
  // Maintenance & Infra
  addTitle(':gear: Maintenance & Infra');
  // others
  addTitle('OTHERS');
  others.forEach(addEntry);

  // Silent
  addTitle('// Silent - these PRs did not have a changelog or were left out for some other reason, is it on purpose?');
  silentPRs.forEach(addEntry);

  fs.writeFileSync(`${process.env.HOME}/Downloads/uilib-release-notes_${NEW_VERSION}.txt`, releaseNotes, {
    encoding: 'utf8'
  });

  console.log(`\x1b[1m\x1b[32m✔\x1b[0m \x1b[32muilib-release-notes.txt was successfully written to ${process.env.HOME}/Downloads\x1b[0m \x1b[1m\x1b[32m✔\x1b[0m`);
}

function addTitle(title) {
  releaseNotes += `\n\n${title}\n\n`;
}

function addEntry(pr) {
  let isSilent = false;
  if (!pr.info.changelog) {
    isSilent = true;
  } else {
    const changelog = pr.info.changelog.toLowerCase();
    if (changelog === 'none' || changelog === 'n/a') {
      isSilent = true;
    }
  }

  if (isSilent && !pr.isSilent) {
    silentPRs.push({...pr, isSilent: true});
  } else if (!isSilent || pr.isSilent) {
    pr.isSilent = false;
    const log = pr.info.changelog || pr.title;
    let requester = pr.info['jira issue'];
    if (requester === undefined || requester.toLowerCase() === 'none' || requester.includes('???')) {
      requester = '';
    } else {
      requester = ` (${requester})`;
    }

    const prNumber = ` (#${pr.number})`;
    if (log.includes('\r\n')) {
      log.split('\r\n').forEach(l => {
        releaseNotes += getLine(l, requester, prNumber);
      });
    } else {
      releaseNotes += getLine(log, requester, prNumber);
    }
  }
}

function getLine(log, requester, prNumber) {
  return `• ${log}${requester}${prNumber} \n`;
}
