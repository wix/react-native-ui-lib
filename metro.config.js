// const {getDefaultConfig} = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://facebook.github.io/metro/docs/configuration
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
// module.exports = (async () => {
//   const {
//     resolver: {sourceExts, assetExts}
//   } = await getDefaultConfig();
//   return {
//     transformer: {
//       getTransformOptions: async () => ({
//         transform: {
//           experimentalImportSupport: false,
//           inlineRequires: false
//         }
//       }),
//       babelTransformerPath: require.resolve('react-native-svg-transformer')
//     },
//     resolver: {
//       assetExts: assetExts.filter(ext => ext !== 'svg'),
//       sourceExts: [...sourceExts, 'svg']
//     }
//   };
// })();

// RN73
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// const {
//   resolver: {sourceExts, assetExts}
// } = getDefaultConfig();

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

const config = {
  // transformer: {
  //   getTransformOptions: async () => ({
  //     transform: {
  //       experimentalImportSupport: false,
  //       inlineRequires: false
  //     }
  //   }),
  //   babelTransformerPath: require.resolve('react-native-svg-transformer')
  // },
  // resolver: {
  //   assetExts: assetExts.filter(ext => ext !== 'svg'),
  //   sourceExts: [...sourceExts, 'svg']
  // }
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
