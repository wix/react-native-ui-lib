const path = require('path');

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

const markdownPagesPlugin = (path = `${__dirname}/../../markdowns/`) => [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `markdown-pages`,
      path
    }
  },
  {
    resolve: `gatsby-transformer-remark`,
    plugins: [
      {
        resolve: `gatsby-remark-prismjs`,
        options: {
        }
      }
    ]
  }
  /* `gatsby-transformer-remark` */
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

const incubatorComponentsDocgenPlugin = [
  'gatsby-transformer-react-docgen',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/../../src/incubator/`
    }
  }
];

const nativeComponentsDocgenPlugin = [
  'gatsby-transformer-react-docgen',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/../../lib/components/`
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

const layoutPlugin = [
  {
    resolve: `gatsby-plugin-layout`,
    options: {
      component: require.resolve(`${path.resolve('./')}/src/components/layout.js`)
    }
  }
];

module.exports = {
  manifestPlugin,
  markdownPagesPlugin,
  componentsDocgenPlugin,
  incubatorComponentsDocgenPlugin,
  nativeComponentsDocgenPlugin,
  imagesPlugin,
  layoutPlugin
};
