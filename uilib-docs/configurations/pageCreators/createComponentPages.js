const path = require('path');
const _ = require('lodash');

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

  const allComponents = getRelevantComponents(
    result.data.allComponentMetadata.edges
  );

  // Create components pages
  allComponents.map(({node}) => {
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

function getRelevantComponents(edges) {
  const components = _.chain(edges)
    /* Filter all Ignored components */
    .filter(e => {
      return e.node.displayName !== 'IGNORE';
    })
    /* Group internal components with parent component */
    .groupBy(e => e.node.displayName)
    .map((groupedEdged, id) => {
      if (groupedEdged.length > 1) {
        const edge = {
          node: {
            displayName: id,
            docblock: _.find(groupedEdged, e => !!e.node.docblock),
            description: _.find(groupedEdged, e => !!e.node.description),
            props: _.reduce(groupedEdged, (props, e) => [...props, ...e.node.props], [])
          }
        };
        return edge;
      } else {
        return groupedEdged[0];
      }
    })
    .value();

  return components;
}
