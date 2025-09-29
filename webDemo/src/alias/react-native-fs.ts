const notSupported = (methodName: string) =>
  Promise.reject(new Error(`react-native-fs '${methodName}' is not supported on web`));

const RNFS = {
  DocumentDirectoryPath: '/',
  CachesDirectoryPath: '/',
  TemporaryDirectoryPath: '/',
  downloadFile: (_options?: any) => ({promise: notSupported('downloadFile')}),
  exists: (_path?: string) => Promise.resolve(false),
  mkdir: (_path?: string) => Promise.resolve(undefined),
  unlink: (_path?: string) => Promise.resolve(undefined),
  readFile: (_path?: string) => Promise.resolve(''),
  writeFile: (_path?: string, _data?: any) => Promise.resolve(undefined)
};

export default RNFS;


