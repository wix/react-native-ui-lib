const GITHUB_TOKEN = 'xxxx';
const FILE_PREFIX = 'uilib';
const REPO = 'wix/react-native-ui-lib';

require('./prReleaseNotesCommon').generateReleaseNotes(GITHUB_TOKEN, FILE_PREFIX, REPO);
