let AsyncStoragePackage: any;
try {
  AsyncStoragePackage = require('@react-native-async-storage/async-storage').default;
} catch (error) {}

export default AsyncStoragePackage;
