const GITHUB_TOKEN = 'xxxx';
const LATEST_VERSION = '7.3.0';
const NEW_VERSION = '7.4.0';
const PREFIX = 'uilib';
const REPO = 'wix/react-native-ui-lib';

require('./prReleaseNotesCommon').generateReleaseNotes(LATEST_VERSION, NEW_VERSION, GITHUB_TOKEN, PREFIX, REPO);
