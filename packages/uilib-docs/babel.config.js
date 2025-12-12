module.exports = {
  presets: [require.resolve('@docusaurus/core/lib/babel/preset')],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        root: ['.'],
        alias: {
          'react-native-ui-lib': require('path').resolve(__dirname, '../react-native-ui-lib/src'),
          commons: require('path').resolve(__dirname, '../react-native-ui-lib/src/commons'),
          helpers: require('path').resolve(__dirname, '../react-native-ui-lib/src/helpers'),
          utils: require('path').resolve(__dirname, '../react-native-ui-lib/src/utils'),
          hooks: require('path').resolve(__dirname, '../react-native-ui-lib/src/hooks'),
          optionalDeps: require('path').resolve(__dirname, '../react-native-ui-lib/src/optionalDependencies'),
          services: require('path').resolve(__dirname, '../react-native-ui-lib/src/services'),
          style: require('path').resolve(__dirname, '../react-native-ui-lib/src/style')
        }
      }
    ]
  ]
};
