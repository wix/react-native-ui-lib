const BASE_DIR = __dirname;

module.exports = {
  entry: `${BASE_DIR}/client/app.js`,
  output: {
    filename: 'bundle.js',
    publicPath: '/build/',
    path: `${BASE_DIR}/build`,
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['stage-0', 'react'],
        },
      },
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader',{
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
};
