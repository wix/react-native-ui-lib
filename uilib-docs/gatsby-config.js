module.exports = {
  pathPrefix: '/react-native-ui-lib',
  siteMetadata: {
    title: 'RNUILIB',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-transformer-react-docgen',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'source',
        path: `${__dirname}/../src/components`,
      },
    },
  ],
};
