const path = require('path');
const _ = require('lodash');

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;
  return new Promise((resolve) => {
    graphql(`
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
    `).then((result) => {
      result.data.allComponentMetadata.edges.map(({node}) => {
        createPage({
          path: `/docs/${node.displayName}`,
          component: path.resolve('./src/templates/component.js'),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            componentNode: node,
            components: result.data.allComponentMetadata.edges,
          },
        });
      });
      resolve();
    });
  });
};
