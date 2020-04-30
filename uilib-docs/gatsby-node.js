/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');
// const {GraphQLBoolean} = require('gatsby/graphql');
// const _ = require('lodash');

// const publicComponentsIds = [];

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;

  graphql(`
    {
      allFile(filter: {sourceInstanceName: {eq: "markdown-pages"}}) {
        edges {
          node {
            id
            name
            childMarkdownRemark {
              fileAbsolutePath
              frontmatter {
                title
                path
              }
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allFile.edges.forEach(({node}) => {
      console.log('ethan - markdown name', node.name);
      createPage({
        name: node.name,
        path: node.childMarkdownRemark.frontmatter.path,
        component: path.resolve(`src/templates/markdownTemplate.js`),
        context: {} // additional data can be passed via context
      });
    });
  });

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

      // Create markdown pages
      // result.data.allMarkdownRemark.edges.forEach(({node}) => {
      //   createPage({
      //     path: node.frontmatter.path,
      //     component: path.resolve(`src/templates/markdownTemplate.js`),
      //     context: {} // additional data can be passed via context
      //   });
      // });

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
