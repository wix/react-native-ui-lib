const path = require('path');
const webpack = require('webpack');

module.exports = ({siteDir}, _options) => {
  const baseProjectSource = [
    path.resolve(siteDir, 'src'),
    path.resolve(siteDir, 'node_modules/react-native-web'),
    path.resolve(siteDir, 'node_modules/react-native-ui-lib'),
    path.resolve(siteDir, 'node_modules/react-native-shimmer-placeholder'),
    path.resolve(siteDir, 'node_modules/react-native-reanimated'),
    path.resolve(siteDir, 'node_modules/react-native-linear-gradient')
    // just for not getting warnings
    // path.resolve(siteDir, 'node_modules/react-native-haptic-feedback'),
    // path.resolve(siteDir, 'node_modules/react-native-animatable'),
    // path.resolve(siteDir, 'node_modules/react-native-svg'),
    // path.resolve(siteDir, 'node_modules/react-native-svg-transformer'),
    // path.resolve(siteDir, 'node_modules/@react-native-community/netinfo'),
    // path.resolve(siteDir, 'node_modules/@react-native-community/datetimepicker'),
    // path.resolve(siteDir, 'node_modules/react-native-color'),

    // path.resolve(siteDir, 'node_modules/postcss'),
    // path.resolve(siteDir, 'node_modules/postcss-js')
  ];

  const useBabelForRN = {
    loader: 'babel-loader',
    options: {
      cacheDirectory: false,
      // The 'react-native' preset is recommended to match React Native's packager
      presets: ['module:metro-react-native-babel-preset'],
      plugins: ['react-native-web', 'react-native-reanimated/plugin']
    }
  };

  const babelLoaderAppConfiguration = {
    test: /\.(js|jsx|ts|tsx)$/,
    include: baseProjectSource,
    use: useBabelForRN
  };

  const imageLoaderConfiguration = {
    include: baseProjectSource,
    test: /\.(gif|jpe?g|png|svg)$/,
    type: 'asset',
    generator: {
      dataUrl: content => {
        content = content.toString();
        const match = content.match(/data:image[^"]+/);
        const imageData = match ? match[0] : '';
        return imageData;
      }
    }
  };

  return {
    name: 'uilib-plugin',
    configureWebpack(_config, _isServer, _utils) {
      return {
        mergeStrategy: {
          'resolve.extensions': 'prepend'
        },
        plugins: [
          new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
            __DEV__: false
          })
        ],
        module: {
          rules: [babelLoaderAppConfiguration, imageLoaderConfiguration]
        },
        resolve: {
          alias: {
            'react-native$': 'react-native-web'
          },
          extensions: ['.web.js']
        }
      };
    }
  };
};
