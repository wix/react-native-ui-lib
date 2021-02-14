const path = require('path');

module.exports = async ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;
  const result = await graphql(`
    {
      allFile(filter: {sourceInstanceName: {eq: "markdown-pages"}, childMarkdownRemark: {frontmatter: {path: {ne: null}}}}) {
        edges {
          node {
            id
            name
            childMarkdownRemark {
              fileAbsolutePath
              frontmatter {
                index
                title
                path
              }
            }
          }
        }
      }
    }
  `);

  result.data.allFile.edges.forEach(({node}) => {
    if (node.childMarkdownRemark.frontmatter.path) {
      createPage({
        name: node.name,
        path: node.childMarkdownRemark.frontmatter.path,
        component: path.resolve(`src/templates/markdownTemplate.js`),
        context: {} // additional data can be passed via context
      });
    }
  });
};
