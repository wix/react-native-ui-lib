import 'setimmediate';
require('./packages/unicorn-demo-app/src/index');
// this is separated from packages/unicorn-demo-app/src/index by purpose
require('./packages/unicorn-demo-app/src/demoApp');

// comment out when measuring performance
// if (process.env.NODE_ENV !== 'production') {
//   const whyDidYouRender = require('@welldone-software/why-did-you-render');
//   const React = require('react');
//   whyDidYouRender(React);
// }
