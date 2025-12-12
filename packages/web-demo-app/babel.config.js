module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: 'last 2 chrome versions, last 2 firefox versions'
      }
    ]
  ],
  plugins: [
    '@babel/plugin-proposal-export-namespace-from',
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true
      }
    ],
    [
      'react-native-web',
      {
        commonjs: true
      }
    ],
    [
      'module-resolver',
      {
        alias: {
          '^react-native$': 'react-native-web',
          commons: require('path').resolve(__dirname, '../react-native-ui-lib/src/commons'),
          helpers: require('path').resolve(__dirname, '../react-native-ui-lib/src/helpers'),
          utils: require('path').resolve(__dirname, '../react-native-ui-lib/src/utils'),
          hooks: require('path').resolve(__dirname, '../react-native-ui-lib/src/hooks'),
          optionalDeps: require('path').resolve(__dirname, '../react-native-ui-lib/src/optionalDependencies'),
          services: require('path').resolve(__dirname, '../react-native-ui-lib/src/services'),
          style: require('path').resolve(__dirname, '../react-native-ui-lib/src/style')
        }
      }
    ],
    'react-native-reanimated/plugin'
  ]
};
