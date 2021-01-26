const {manifestPlugin, markdownPagesPlugin, componentsDocgenPlugin, incubatorComponentsDocgenPlugin, nativeComponentsDocgenPlugin, imagesPlugin, layoutPlugin} = require('./configurations/plugins');

module.exports = {
  pathPrefix: '/react-native-ui-lib',
  siteMetadata: {
    title: `RNUILib`,
    description: `React Native UI Toolset and Components Library`,
    author: `ethans@wix.com`,
    domain: 'react-native-ui-lib',
    github: 'https://github.com/wix/react-native-ui-lib'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    ...markdownPagesPlugin(),
    ...componentsDocgenPlugin,
    ...incubatorComponentsDocgenPlugin,
    ...nativeComponentsDocgenPlugin,
    ...imagesPlugin,
    ...manifestPlugin,
    ...layoutPlugin
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ]
};
