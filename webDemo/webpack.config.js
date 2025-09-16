const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const appDirectory = path.resolve(__dirname, '.');

const baseProjectSource = [
  path.resolve(appDirectory, 'src'),
  path.resolve(appDirectory, 'node_modules/react-native-web'),
  // just for not getting warnings
  path.resolve(appDirectory, 'node_modules/react-native-shimmer-placeholder'),
  path.resolve(appDirectory, 'node_modules/react-native-linear-gradient'),
  // end just for not getting warnings
  path.resolve(appDirectory, 'node_modules/react-native-haptic-feedback'),
  path.resolve(appDirectory, 'node_modules/react-native-animatable'),
  path.resolve(appDirectory, 'node_modules/react-native-reanimated'),
  path.resolve(appDirectory, 'node_modules/react-native-svg'),
  path.resolve(appDirectory, 'node_modules/react-native-svg-transformer'),
  path.resolve(appDirectory, 'node_modules/@react-native-community/netinfo'),
  path.resolve(appDirectory, 'node_modules/@react-native-community/datetimepicker'),
  path.resolve(appDirectory, 'node_modules/react-native-color'),
  path.resolve(appDirectory, 'node_modules/react-native-ui-lib'),
  path.resolve(appDirectory, 'node_modules/postcss'),
  path.resolve(appDirectory, 'node_modules/postcss-js'),
  path.resolve(appDirectory, 'node_modules/uilib-native')
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

module.exports =
{
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
    rules: [
      babelLoaderAppConfiguration,
      imageLoaderConfiguration
    ]
  },
  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      'react-native$': 'react-native-web',
      '@shopify/flash-list': path.resolve(appDirectory, './src/alias/flash-list.ts'),
      'react-native-fs': path.resolve(appDirectory, './src/alias/react-native-fs.ts')
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: ['.web.js', '.js', '.jsx', '.tsx', '.ts']
  },
  devServer: {
    contentBase: path.resolve(appDirectory, './dist'),
    compress: true,
    port: 9001
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*'
      ]
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
