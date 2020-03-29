// WIP
const fetch = require('node-fetch');
const {spawn, exec} = require('child_process');

const bootCommand = `xcrun simctl launch booted env.wix.uilib && npm run start`;
const command = 'node';
const args = ['node_modules/react-native/local-cli/cli.js', 'start'];

const packager = spawn(command, args, {cwd: '.'});

let booted = false;
packager.stdout.on('data', async data => {
  console.log(`${data}`);

  const readyToBoot = await ping();
  if (readyToBoot && !booted) {
    booted = true;
    exec(bootCommand);
  }
});

const ping = async () => {
  try {
    await fetch(`http://localhost:8081`);
    return true;
  } catch (ex) {
    if (ex.message.includes('ECONNREFUSED')) {
      return false;
    }
    throw ex;
  }
};
