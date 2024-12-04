module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        root: ['.'],
        alias: {
          'react-native-ui-lib': './src/index.ts',
          commons: './src/commons',
          helpers: './src/helpers',
          utils: './src/utils',
          hooks: './src/hooks',
          optionalDeps: './src/optionalDependencies',
          services: './src/services',
          style: './src/style'
        }
      }
    ]
  ]
};
