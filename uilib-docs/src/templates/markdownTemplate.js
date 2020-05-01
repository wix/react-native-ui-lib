import React from 'react';
import {graphql} from 'gatsby';

import './markdown.scss';
import Layout from '../components/layout';

export default function Template({data}) {
  const {
    html,
    frontmatter: {title}
  } = data.markdownRemark;
  return (
    <Layout showSidebar>
      <div className="markdown">
        <div className="markdown-content">
          <h1 className="title">{title}</h1>
          <div dangerouslySetInnerHTML={{__html: html}}/>
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: {path: {eq: $path}}) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;
