let RNFS: typeof import('react-native-fs') | undefined;
try {
  RNFS = require('react-native-fs');
} catch (error) {}

export default RNFS;
