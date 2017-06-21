const webpack = require('webpack');

const BASE_DIR = __dirname;

module.exports = {
  entry: `${BASE_DIR}/client/app.js`,
  output: {
    filename: 'bundle.js',
    publicPath: '/react-native-ui-lib/build/',
    path: `${BASE_DIR}/build`,
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015'],
        },
      },
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader', {
        loader: 'sass-resources-loader',
        options: {
          resources: [`${BASE_DIR}/client/styles/_vars.scss`],
        },
      }],
    },
    // {
    //   test: /\.md$/,
    //   use: ['html-loader', 'markdown-loader'],
    // }
    ],
  },
  plugins: process.argv.indexOf('-p') === -1 ? [] : [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
    }),
  ],
};
