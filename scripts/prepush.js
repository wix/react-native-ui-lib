#!/usr/bin/env node

const semver = require('semver');
const fs = require('fs');
const path = require('path');

const nodeVersion = fs.readFileSync(path.resolve(process.cwd(), '.nvmrc'), 'utf-8').trim();
if (!semver.gte(process.version.substring(1), nodeVersion)) {
  throw new Error(`Node version must be at least ${nodeVersion}`);
}

const cp = require('child_process');
const {logGreen, logError} = require('./utils');
const {Spinner} = require('@topcli/spinner');

const ARGS = process.argv.slice(2);
const TEST_ARG = 'test';
const TEST_COMMAND = 'yarn test';

const PRE_PUSH_COMMANDS = [
  'yarn constraints',
  'yarn dedupe --check',
  'yarn lint --quiet',
  'yarn build:dev >/dev/null'
];

async function run() {
  logGreen('Running pre-push checks...');
  const commands = [...PRE_PUSH_COMMANDS];
  if (ARGS.includes(TEST_ARG)) {
    commands.push(TEST_COMMAND);
  }
  const promises = commands.map(execute);
  const results = await Promise.allSettled(promises);
  const failed = results.filter(result => result.status === 'rejected');
  if (failed.length > 0) {
    logError('Pre-push checks failed!');
    failed.forEach(result => logFailedCommand(result.reason));
    process.exit(1);
  }
  process.exit(0);
}

function logFailedCommand({command, stdout, stderr}) {
  logError(`${command}:`);
  if (stdout) {
    logError('STDOUT:');
    logError(stdout);
  }
  if (stderr) {
    logError('STDERR:');
    logError(stderr);
  }
}

async function execute(command) {
  const spinner = new Spinner();
  return new Promise((resolve, reject) => {
    spinner.start(command);
    cp.exec(command, {encoding: 'utf-8'}, (error, stdout, stderr) => {
      if (error) {
        spinner.failed();
        reject({command, error, stdout, stderr});
      }
      spinner.succeed();
      resolve();
    });
  });
}

run();
