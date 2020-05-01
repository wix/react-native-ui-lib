const {manifestPlugin, markdownPagesPlugin, componentsDocgenPlugin, imagesPlugin} = require('./configurations/plugins');

module.exports = {
  pathPrefix: '/react-native-ui-lib',
  siteMetadata: {
    title: `U I L I B`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    ...markdownPagesPlugin,
    ...componentsDocgenPlugin,
    ...imagesPlugin,
    ...manifestPlugin
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ]
};
