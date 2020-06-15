const manifestPlugin = [
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `React Native UI Library`,
      short_name: `RNUILIB`,
      start_url: `/`,
      // background_color: `#663399`,
      // theme_color: `#663399`,
      display: `minimal-ui`,
      icon: `src/images/logo.png` // This path is relative to the root of the site.
    }
  }
];

const markdownPagesPlugin = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `markdown-pages`,
      path: `${__dirname}/../../markdowns/`
    }
  },
  `gatsby-transformer-remark`
];

const componentsDocgenPlugin = [
  'gatsby-transformer-react-docgen',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/../../src/components/`
    }
  }
];

const imagesPlugin = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `src/images`
    }
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`
];

module.exports = {
  manifestPlugin,
  markdownPagesPlugin,
  componentsDocgenPlugin,
  imagesPlugin
};
