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
    /* Group internal components with the parent component */
    .groupBy(e => e.node.displayName)
    .map((groupedEdge, id) => {
      if (groupedEdge.length > 1) {
        const edge = {
          node: {
            displayName: id,
            docblock: _.chain(groupedEdge).find(e => !!e.node.docblock).get('node.docblock').value(),
            props: _.reduce(groupedEdge, (props, e) => [...props, ...e.node.props], [])
          }
        };
        
        /* Fix duplicate props (e.g Carousel) when they appear in different files of the component code */
        const groupedProps = _.groupBy(edge.node.props, 'name');
        _.forEach(groupedProps, (group, groupKey) => {
          groupedProps[groupKey] = _.reduce(group, (result, prop) => _.merge(result, prop), {})
        });
        edge.node.props = _.values(groupedProps);

        return edge;
      } else {
        return groupedEdge[0];
      }
    })
    .value();

  return components;
}
