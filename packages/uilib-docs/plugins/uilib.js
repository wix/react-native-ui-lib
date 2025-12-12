const path = require('path');
const webpack = require('webpack');

module.exports = ({siteDir}, _options) => {
  const rnModules = [
    'react-native-web',
    'react-native-ui-lib',
    'react-native-reanimated',
    'react-native-shimmer-placeholder',
    'react-native-linear-gradient',
    '@react-native-community/datetimepicker',
    'react-native-fs'
  ];
  const makeNodeModulesRegex = (name) => new RegExp(`node_modules[\\\\/]${name}[\\\\/]`);

  // Absolute paths (when packages are installed inside docuilib)
  const inSiteNodeModules = rnModules.map(m => path.resolve(siteDir, 'node_modules', m));
  // Regex match to also catch hoisted locations (e.g. root/node_modules)
  const hoistedNodeModulesRegexes = rnModules.map(makeNodeModulesRegex);

  const baseProjectSource = [
    // Project sources
    path.resolve(siteDir, 'src'),
    // Specific absolute locations
    ...inSiteNodeModules,
    // And any hoisted locations matching these node_modules
    ...hoistedNodeModulesRegexes
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
    include: (filepath) => {
      // Include files from baseProjectSource, but exclude React Native internals
      const shouldIncludeFromBase = baseProjectSource.some((source) => {
        if (source instanceof RegExp) {
          return source.test(filepath);
        }
        return filepath.includes(source);
      });
      
      if (!shouldIncludeFromBase) {
        return false;
      }
      
      return true;
    },
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
          extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js']
        }
      };
    }
  };
};
