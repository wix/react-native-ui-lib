require('./demo/src/index');
require('./demo/src/demoApp'); // this is separated from demo/src/index by purpose

// comment out when measuring performance
// if (process.env.NODE_ENV !== 'production') {
//   const whyDidYouRender = require('@welldone-software/why-did-you-render');
//   const React = require('react');
//   whyDidYouRender(React);
// }
