module.exports = {
  plugins: [
    ['@babel/plugin-transform-modules-commonjs', {lazy: () => true}]
  ],
  compact: false
};
