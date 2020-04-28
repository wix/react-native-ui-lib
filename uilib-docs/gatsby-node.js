/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');
const {GraphQLBoolean} = require('gatsby/graphql');
const _ = require('lodash');

const publicComponentsIds = [];

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;
  return new Promise(resolve => {
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
    `).then(result => {
      // create docs intro page
      createPage({
        path: `/docs`,
        component: path.resolve('./src/templates/component.js'),
        context: {
          // Data passed to context is available in page queries as GraphQL variables.
        }
      });
      
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

// We don't need this in public docs
// exports.setFieldsOnGraphQLNodeType = ({type}) => {
//   if (type.name === 'ComponentMetadata') {
//     const componentsByGroups = _.groupBy(type.nodes, 'displayName');
//     _.forEach(componentsByGroups, group => {
//       // has public origin
//       if (group.length === 2) {
//         publicComponentsIds.push(_.last(group).id);
//       }
//     });

//     return {
//       isPublic: {
//         type: GraphQLBoolean,

//         resolve: source => {
//           return _.includes(publicComponentsIds, source.id);
//         },
//       },
//     };
//   }

//   return {};
// };
