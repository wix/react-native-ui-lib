const fs = require('fs');

// Read yarn.lock
const yarnLock = fs.readFileSync('yarn.lock', 'utf8');

// Count matches first
const regex = /(.*)::__archiveUrl.*"/g;
const matches = yarnLock.match(regex);
const count = matches ? matches.length : 0;

// Apply regex replacement
const result = yarnLock.replace(regex, '$1"');

// Write back to yarn.lock
fs.writeFileSync('yarn.lock', result, 'utf8');

console.log(`Successfully cleaned yarn.lock - removed ${count} __archiveUrl entries`);
