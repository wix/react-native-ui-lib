let JsCssPackage: {postcss: any, postcssJs: any} | undefined;
try {
  const postcss = require('postcss');
  const postcssJs = require('postcss-js');
  

  JsCssPackage = {
    postcss,
    postcssJs
  };
} catch (error) {}

export default JsCssPackage;
