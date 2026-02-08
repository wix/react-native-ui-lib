/* eslint-disable no-restricted-syntax */
const exec = require('shell-utils').exec;
const fs = require('fs');
const path = require('path');
const {logDebug, logGreen, logError} = require('../utils');
const {
  dryRun,
  isRelease,
  isSnapshot,
  versionTag,
  getPublishedVersion,
  getPackageJsonVersion,
  getShouldRelease,
  getVersion,
  setupGit,
  createNpmRc
} = require('./releaseUtils');

if (!process.env.CI) {
  logError('Releasing is only available from CI');
  if (dryRun) {
    logDebug('Dry run - not exiting');
  } else {
    process.exit(1);
  }
}

const PACKAGES = [
  {
    name: 'uilib-native',
    shouldUpdatePackageJson: !!isSnapshot,
    releaseVersionStrategy: 'packageJsonVersion'
  },
  {
    name: 'react-native-ui-lib',
    shouldUpdatePackageJson: true,
    releaseVersionStrategy: isRelease ? 'buildKiteVersion' : 'packageJsonVersion',
    workspaceDeps: ['uilib-native']
  }
];

logDebug('Checking if packages should be released...');
PACKAGES.forEach(package => {
  package.publishedVersion = getPublishedVersion(package.name);
  package.packageJsonVersion = getPackageJsonVersion(package.name);
  package.shouldRelease = getShouldRelease(package);
});

if (!PACKAGES.every(package => package.shouldRelease)) {
  logGreen('No packages to release');
  if (dryRun) {
    logDebug('Dry run - not exiting');
  } else {
    process.exit(0);
  }
}

logDebug('Getting packages information...');
PACKAGES.forEach(package => {
  package.path = `packages/${package.name}`;
  package.version = getVersion(package, dryRun);
  if (package.workspaceDeps?.length > 0) {
    package.workSpaceTempDeps = [];
    package.workspaceDeps.forEach(dep => {
      package.workSpaceTempDeps.push(PACKAGES.find(p => p.name === dep)?.publishedVersion);
    });
  }
});

logDebug('Packages information:');
logDebug(JSON.stringify(PACKAGES, null, 2));

setupGit(dryRun);
createNpmRc(dryRun);

logGreen('Replacing all workspace:* dependencies with temporary versions...');
for (const package of PACKAGES) {
  if (package.workspaceDeps?.length > 0) {
    package.workspaceDeps.forEach((dep, index) => {
      const packageJsonPath = path.join(package.path, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      logDebug(`${package.name} - ${dep}:${packageJson.devDependencies[dep]} -> ${package.workSpaceTempDeps[index]}`);
      packageJson.devDependencies[dep] = package.workSpaceTempDeps[index];
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4) + '\n');
    });
  }
}

const originalCwd = process.cwd();
logDebug(`Starting release process with ${versionTag}`);
try {
  for (const package of PACKAGES) {
    logDebug(`Trying to release ${package.name} in ${package.path}`);
    process.chdir(package.path);
    // Update version in package.json
    if (package.shouldUpdatePackageJson) {
      if (dryRun) {
        exec.execSync(`npm --no-git-tag-version --no-workspaces-update version ${package.version}`, true);
      } else {
        exec.execSync(`npm --no-git-tag-version version ${package.version}`, true);
      }
      logDebug(`Successfully updated version for ${package.name} to ${package.version}`);
    } else {
      logDebug(`Skipping version update for ${package.name}`);
    }
    if (!dryRun) {
      // Publish to npm
      exec.execSync(`npm publish --tag ${versionTag}`);
      // Create git tag for releases (not snapshots)
      if (isRelease) {
        exec.execSync(`git tag -a ${package.version} -m "${package.version}"`);
        exec.execSync(`git push deploy ${package.version}`);
        // TODO: backup - exec.execSyncSilent(`git push deploy ${package.version} || true`);
      }
      logGreen(`Successfully released ${package.name}@${package.version}`);
    } else {
      logGreen(`Dry run - not releasing ${package.name}@${package.version}`);
    }
    process.chdir(originalCwd);
    // Write package.version to all relevant workspaceDeps
    PACKAGES.forEach(p => {
      if (p.workspaceDeps?.length > 0) {
        p.workspaceDeps.forEach(dep => {
          const packageJsonPath = path.join(originalCwd, 'packages', p.name, 'package.json');
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
          if (dep === package.name) {
            const depPackageJsonPath = path.join(originalCwd, 'packages', dep, 'package.json');
            const depPackageJson = JSON.parse(fs.readFileSync(depPackageJsonPath, 'utf8'));
            const oldVersion = packageJson.devDependencies[dep];
            const newVersion = depPackageJson.version;
            logGreen(`Updating workspace dependency ${p.name} - ${dep}:${oldVersion} -> ${newVersion}`);
            packageJson.devDependencies[dep] = newVersion;
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4) + '\n');
            logGreen('Successfully updated workspace dependency');
          }
        });
      }
    });
  }
} catch (error) {
  logError(`Failed to release all packages: ${error.message}`);
  process.exit(1);
}
