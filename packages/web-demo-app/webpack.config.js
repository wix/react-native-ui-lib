const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const appDirectory = path.resolve(__dirname, '.');

const baseProjectSource = [
  path.resolve(appDirectory, 'src'),
  path.resolve(appDirectory, 'node_modules/react-native-reanimated'),
  path.resolve(appDirectory, '../../node_modules/react-native-reanimated'),
  path.resolve(appDirectory, '../react-native-ui-lib')
];

const useBabelForRN = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    // The 'react-native' preset is recommended to match React Native's packager
    presets: ['module:metro-react-native-babel-preset'],
    // Re-write paths to import only the modules needed by the app
    plugins: ['react-native-web', 'react-native-reanimated/plugin']
  }
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false
    }
  }
};

const babelLoaderAppConfiguration = {
  test: /\.(js|jsx|ts|tsx)$/,
  include: baseProjectSource,
  use: useBabelForRN
};

module.exports = {
  entry: {
    app: path.resolve(appDirectory, './src/index.ts')
  },
  output: {
    path: path.join(appDirectory, './dist'),
    filename: 'app.js'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [babelLoaderAppConfiguration, imageLoaderConfiguration]
  },
  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      'react-native$': 'react-native-web',
      '@shopify/flash-list': false,
      'react-native-fs': false,
      'react-native-shimmer-placeholder': false,
      'react-native-linear-gradient': false,
      '@react-native-community/datetimepicker': false,
      '@react-native-community/blur': false,
      'react-native-svg': false,
      'uilib-native': false
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: ['.web.js', '.js', '.jsx', '.tsx', '.ts']
  },
  devServer: {
    static: {
      directory: path.resolve(appDirectory, './dist')
    },
    compress: true,
    port: 9001
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*']
    }),
    // `process.env.NODE_ENV === 'production'` must be `true` for production
    // builds to eliminate development checks and reduce build size. You may
    // wish to include additional optimizations.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      __DEV__: process.env.NODE_ENV === 'production' || true
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(appDirectory, './index.html')
    })
  ]
};
