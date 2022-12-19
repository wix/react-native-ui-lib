let AsyncStoragePackage: any;
try {
  AsyncStoragePackage = require('@react-native-community/async-storage').default;
} catch (error) {}

export default AsyncStoragePackage;
