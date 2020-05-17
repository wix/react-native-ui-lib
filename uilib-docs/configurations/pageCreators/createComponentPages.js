const path = require('path');

module.exports = async ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;

  const result = await graphql(`
    {
      allComponentMetadata {
        edges {
          node {
            displayName
            docblock
            description {
              text
            }
            props {
              name
              type {
                name
              }
              description {
                text
              }
              defaultValue {
                value
              }
            }
          }
        }
      }
    }
  `);
  // create docs intro page
  createPage({
    path: `/docs`,
    component: path.resolve('./src/templates/component.js'),
    context: {
      // Data passed to context is available in page queries as GraphQL variables.
    }
  });

  // Create components pages
  result.data.allComponentMetadata.edges.map(({node}) => {
    createPage({
      path: `/docs/${node.displayName}`,
      component: path.resolve('./src/templates/component.js'),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        componentNode: node,
        components: result.data.allComponentMetadata.edges
      }
    });
  });
};
