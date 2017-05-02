const _ = require('lodash');
const fs = require('fs');
const reactDocs = require('react-docgen');
const customHandler = require('./customHandler')('customMemberName');
const propTypesDocHandler = require('./propTypesDocHandler');


// import displayNameHandler from 'react-docgen-displayname-handler';
const resolver = reactDocs.resolver.findExportedComponentDefinition;
// const handlers = reactDocs.handlers.concat(displayNameHandler);
const handlers = _.toArray(reactDocs.handlers).concat([customHandler, propTypesDocHandler]);

const src = fs.readFileSync('./src/components/button/index.js');
const documentation = reactDocs.parse(src, resolver, handlers);


console.log('generate docs', documentation);
