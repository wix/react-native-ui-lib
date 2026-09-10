#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');

const SKILL_NAME = 'uilib-codegen';
const SOURCE_DIR = path.join(__dirname, 'skills', SKILL_NAME);
const TARGET_DIR = path.join(process.cwd(), '.claude', 'skills', SKILL_NAME);

function copyDir(src, dest) {
  fs.mkdirSync(dest, {recursive: true});
  for (const entry of fs.readdirSync(src, {withFileTypes: true})) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (!fs.existsSync(SOURCE_DIR)) {
  process.stderr.write(`Error: skill source not found at ${SOURCE_DIR}\n`);
  process.exit(1);
}

console.log(`Installing ${SKILL_NAME} Claude Code skill...`);
copyDir(SOURCE_DIR, TARGET_DIR);
console.log(`Done! Skill installed at ${TARGET_DIR}`);
console.log('Restart Claude Code to activate it.');
