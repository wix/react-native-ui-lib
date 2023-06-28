let ClipboardPackage: any;
try {
  ClipboardPackage = require('@react-native-community/clipboard').default;
} catch (error) {}

export default ClipboardPackage;
