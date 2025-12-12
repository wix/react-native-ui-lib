let PostCssPackage: {postcss: any, cssjs: any} | undefined;
try {
  const postcss = require('postcss');
  const cssjs = require('postcss-js');
  

  PostCssPackage = {
    postcss,
    cssjs
  };
} catch (error) {}

export default PostCssPackage;
