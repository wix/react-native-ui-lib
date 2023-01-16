let JsCssPackage: {postcss: any, cssjs: any} | undefined;
try {
  const postcss = require('postcss');
  const cssjs = require('postcss-js');
  

  JsCssPackage = {
    postcss,
    cssjs
  };
} catch (error) {}

export default JsCssPackage;
