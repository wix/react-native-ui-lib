const fs = require('fs');
const semver = require('semver');
const axios = require('axios');

const pathToPackageJson = './package.json';
const bumpType = process.argv[2] || 'minor';

async function getLatestVersionFromGithub(repoUrl) {
  return await axios
    .get(repoUrl)
    .then(response => {
      const releaseData = response.data;
      const version = releaseData[0].tag_name;
      if (!semver.valid(version)) {
        throw new Error('Invalid version format in GitHub release');
      }
      return version;
    })
    .catch(error => {
      throw new Error('Error fetching latest version from GitHub:', error);
    });
}

function bumpVersion(pathToPackageJson, bumpType = 'patch', latestVersion) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(pathToPackageJson, 'utf8'));
    if (!semver.valid(packageJson.version)) {
      throw new Error('Invalid version format in package.json');
    }

    //Bump the version based on the specified type (patch - hot fix, minor - release cycle, major)
    packageJson.version = semver.inc(latestVersion !== packageJson.version ? latestVersion : packageJson.version,
      bumpType);

    fs.writeFileSync(pathToPackageJson, JSON.stringify(packageJson, null, 2));
    console.log(`Version bumped to: ${packageJson.version}`);
    return {newVersion: packageJson.version};
  } catch (error) {
    console.error('Error bumping version:', error.message);
  }
}

async function handleVersionBump(repo) {
  try {
    const repoUrl = `https://api.github.com/repos/${repo}/releases`;
    const latestVersion = await getLatestVersionFromGithub(repoUrl);
    console.log(`${repo} current version is v${latestVersion}`);
    const {newVersion} = bumpVersion(pathToPackageJson, bumpType, latestVersion);
    return {latestVersion, newVersion};
  } catch (error) {
    console.error('Error getting current branch:', error);
  }
}

module.exports = {handleVersionBump, bumpVersion, getLatestVersionFromGithub};
