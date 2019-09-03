module.exports = {
  env: {
    test: {
      presets: ['module:metro-react-native-babel-preset'],
      retainLines: true,
    },
  },
  presets: ['module:metro-react-native-babel-preset'],
  retainLines: true,
  plugins: ['transform-inline-environment-variables'],
};
