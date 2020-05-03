/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const {createMarkdownPages, createComponentPages} = require('./configurations/pageCreators');

exports.createPages = ({graphql, boundActionCreators}) => {
  createMarkdownPages({graphql, boundActionCreators});
  createComponentPages({graphql, boundActionCreators});
};
