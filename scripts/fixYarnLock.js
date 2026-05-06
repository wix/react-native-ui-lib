const fs = require('fs');
const yarnLockPath = process.argv[2];

// Read yarn.lock
const yarnLock = fs.readFileSync(yarnLockPath, 'utf8');

// Count matches first
const regex = /(.*)::__archiveUrl.*"/g;
const encodedRegex = /(.*)%3A%3A__archiveUrl.*"/g;
const matches = yarnLock.match(regex);
const encodedMatches = yarnLock.match(encodedRegex);
const count = (matches ? matches.length : 0) + (encodedMatches ? encodedMatches.length : 0);

// Apply regex replacement
const result = yarnLock.replace(regex, '$1"').replace(encodedRegex, '$1"');

// Write back to yarn.lock
fs.writeFileSync(yarnLockPath, result, 'utf8');

console.log(`Successfully cleaned ${yarnLockPath} - removed ${count} __archiveUrl entries`);
