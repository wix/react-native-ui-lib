module.exports = {
  env: {
    test: {
      presets: ['module:metro-react-native-babel-preset'],
      plugins: ['react-native-reanimated/plugin']
    }
  },
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        // extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          style: './src/style',
          helpers: './src/helpers'
        }
      }
    ],
    'react-native-reanimated/plugin'
  ]
};
